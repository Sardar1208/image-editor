import { RefObject, useEffect, useRef } from "react";
import BrightnessWorker from "../workers/tuneImageWorker.ts?worker";
import * as Comlink from "comlink";
import { ImageState } from "../types/T_ImageState.js";
import store from "../store.js";
import { updateAdjustment } from "../reducers/tuneImageReducer.js";
import { clearCurrentImage, getImageDataforOP, setCurrentImage } from "../utils/image_state_manager.js";
import { AdjustmentType, M_AdjustmentType } from "../types/T_ProcessTypes.js";

function useWorker() {
  const workerRef = useRef<any>(null);

  useEffect(() => {
    const worker = new BrightnessWorker();
    workerRef.current = Comlink.wrap(worker);
  }, []);

  return workerRef.current;
}

function tune_image(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  operation: AdjustmentType,
  value: number,
  workerRef: Comlink.Remote<any>,
  imageState?: ImageState,
  setState?: React.Dispatch<React.SetStateAction<ImageState>>,
) {

  if(!imageState || !setState) {
    return;
  }

  store.dispatch(
    updateAdjustment({
      operation,
      value,
    })
  );

  const seq = store.getState().tuneImageReducer.adjustments;

  const adjustments: AdjustmentType[] = [];
  const values: number[] = [];

  seq.map((item) => {
    adjustments.push(item.operation);
    const adjustedValue = getValueForAdjustmentType(item.operation, item.value)
    values.push(adjustedValue);
  });

  adjust_image(canvasRef, imageState, setState, adjustments, values, workerRef);
}

function adjust_image(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  imageState: ImageState,
  setState: React.Dispatch<React.SetStateAction<ImageState>>,
  adjustments: AdjustmentType[],
  values: number[],
  workerRef: Comlink.Remote<any>
) {
  const canvas = canvasRef.current!;
  const ctx = canvas?.getContext("2d")!;

  const imageData = getImageDataforOP(imageState);

  if (adjustments.length == 0) {
    ctx.putImageData(imageData!, 0, 0);
    clearCurrentImage(setState);
    return;
  }

  (async () => {
    const adjustedImageData = await workerRef.adjustImage(
      imageData,
      adjustments,
      values
    );

    ctx.putImageData(adjustedImageData, 0, 0);

    // Update the current image for new uncommited changes
    setCurrentImage(setState, "tune_image", adjustedImageData);
  })();
}


// TODO - pass the adjusted values to the wasm processor insed of raw values from the slider
function getValueForAdjustmentType(
  operation: AdjustmentType,
  rawValue: number
) {
  switch (operation) {
    case M_AdjustmentType.Shadows: {
      return rawValue * -0.1;
    }
    case M_AdjustmentType.Vibrance: {
      return rawValue * 10;
    }
    case M_AdjustmentType.Brightness: {
      return rawValue * 5;
    }
    case M_AdjustmentType.Contrast: {
      return rawValue * 5;
    }
    case M_AdjustmentType.Saturation: {
      return (rawValue / 10) * 0.8;
    }
    case M_AdjustmentType.Temperature: {
      return rawValue * 5;
    }
    case M_AdjustmentType.Tint: {
      return rawValue * 5;
    }
    default: {
      return rawValue;
    }
  }
}

export { tune_image, useWorker };
