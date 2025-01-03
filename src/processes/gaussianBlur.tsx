import { RefObject } from "react";
import * as wasm from "../../rust/pkg/rust.js";

export default function gaussianBlur(canvasRef: RefObject<HTMLCanvasElement | null>, image: HTMLImageElement) {
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d")!;
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    console.time("blur");
    wasm.gaussian_blur(new Uint8Array(imageData.data.buffer), imageData.width, imageData.height);
    console.timeEnd("blur");
    ctx.putImageData(imageData, 0, 0);
}

export function gaussianBlurJS(canvasRef: RefObject<HTMLCanvasElement | null>, imageData: Uint8ClampedArray, width: number, height: number) {
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d")!;

    // Gaussian kernel (3x3)
    const kernel = [
        [1 / 16, 2 / 16, 1 / 16],
        [2 / 16, 4 / 16, 2 / 16],
        [1 / 16, 2 / 16, 1 / 16]
    ];
    const half = Math.floor(kernel.length / 2);

    // Create an output array the same size as the input image data
    const output = new Uint8ClampedArray(imageData.length);

    // Loop over each pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, a = 0;

            // Apply the kernel by copying over data for all pixels
            for (let ky = -half; ky <= half; ky++) {
                for (let kx = -half; kx <= half; kx++) {
                    const posY = Math.min(Math.max(y + ky, 0), height - 1);
                    const posX = Math.min(Math.max(x + kx, 0), width - 1);
                    const weight = kernel[ky + half][kx + half];
                    const index = (posY * width + posX) * 4;

                    r += imageData[index] * weight;
                    g += imageData[index + 1] * weight;
                    b += imageData[index + 2] * weight;
                    a += imageData[index + 3] * weight;
                }
            }

            // Assign the blurred pixel values to the output array
            const index = (y * width + x) * 4;
            output[index] = r;
            output[index + 1] = g;
            output[index + 2] = b;
            output[index + 3] = a;
        }
    }
    // console.log("Og: ", imageData.length);
    console.log("NEW: ", output.length);


    const blurredImageData = new ImageData(output, width, height);
    ctx.putImageData(blurredImageData, 0, 0);
}