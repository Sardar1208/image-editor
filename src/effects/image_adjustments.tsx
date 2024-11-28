import { RefObject, useEffect, useRef } from "react";
import BrightnessWorker from '../workers/tuneImageWorker.ts?worker';
import * as Comlink from 'comlink';
import { getAdjustmentSequence, getImageDataforOP, updateSnapshots } from "../utils/image_state_manager.js";
import { AdjustmentType, ImageState } from "../types/image_adjustments.js";

function useWorker() {
    const workerRef = useRef<any>(null);

    useEffect(() => {
        const worker = new BrightnessWorker();
        workerRef.current = Comlink.wrap(worker);
    }, []);

    return workerRef.current;
}

function tune_image(canvasRef: RefObject<HTMLCanvasElement | null>, imageState: ImageState, setImageState: React.Dispatch<React.SetStateAction<ImageState>>, operation: AdjustmentType, value: number, workerRef: Comlink.Remote<any>) {

    const res = getAdjustmentSequence(imageState, operation, value);

    console.log("sequence: ", res.sequence);

    for (let process of res.sequence) {
        const value = getValueForAdjustmentType(process.operation, process.value);
        adjust_image(canvasRef, imageState, setImageState, process.operation, value, workerRef);
    }
}

function adjust_image(canvasRef: RefObject<HTMLCanvasElement | null>, imageState: ImageState, setImageState: React.Dispatch<React.SetStateAction<ImageState>>, type: AdjustmentType, value: number, workerRef: Comlink.Remote<any>) {
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d")!;

    const imageData = getImageDataforOP(imageState, type);

    (async () => {
        const adjustedImageData = await workerRef.adjustImage(imageData, type, value);
        updateSnapshots(setImageState, type, value, adjustedImageData);

        ctx.putImageData(adjustedImageData, 0, 0);
    })();
}

function getValueForAdjustmentType(operation: AdjustmentType, rawValue: number) {
    switch(operation) {
        case "shadow": {
            return rawValue * 0.1;
        };
        case "saturation": {
            return 0.5 + ((rawValue - 50) / 100);
        };
        default: {
            return rawValue;
        }
    }
}

export {
    tune_image,
    useWorker,
}