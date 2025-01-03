import { RefObject } from "react";
import * as wasm from "../../rust/pkg/rust.js";
import store from "../store.js";

export default function greyScale(canvasRef: RefObject<HTMLCanvasElement | null>, image: HTMLImageElement) {
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d")!;
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    wasm.greyscale_image(new Uint8Array(imageData.data.buffer));
    // store.dispatch(addImageLayer({name: "greyscale"}));
    ctx.putImageData(imageData, 0, 0);
}


function greyscaleImage(imageData: Uint8ClampedArray) {
    console.time("JavaScript Grayscale");

    for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];

        // Calculate grayscale value using the luminance formula
        const average = Math.round((red * 0.299) + (green * 0.587) + (blue * 0.114));

        // Set RGB channels to the grayscale value
        imageData[i] = average;      // Red
        imageData[i + 1] = average;  // Green
        imageData[i + 2] = average;  // Blue
        // imageData[i + 3] is the alpha channel, left unchanged
    }
    console.timeEnd("JavaScript Grayscale");
}