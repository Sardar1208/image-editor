import { RefObject } from "react";
import * as wasm from "../../rust/pkg/rust.js";

export default function edgeDetect(canvasRef: RefObject<HTMLCanvasElement | null>, image: HTMLImageElement) {
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d")!;
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    console.time("edge");
    wasm.edge_detection(new Uint8Array(imageData.data.buffer), imageData.width, imageData.height);
    console.timeEnd("edge");
    ctx.putImageData(imageData, 0, 0);
}

export function edgeDetectJS(canvasRef: RefObject<HTMLCanvasElement | null>, image: HTMLImageElement) {
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d")!;
    const imageData: ImageData = ctx.getImageData(0, 0, image.width, image.height);
    // Convert the image to grayscale
    function greyscaleImage(data: ImageData) {
        for (let i = 0; i < data.data.length; i += 4) {
            const avg = Math.round((data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3);
            data.data[i] = avg;        // Red
            data.data[i + 1] = avg;    // Green
            data.data[i + 2] = avg;    // Blue
            // Alpha remains unchanged
        }
    }

    greyscaleImage(imageData);

    const gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const gy = [1, 2, 1, 0, 0, 0, -1, -2, -1];
    const kernelSize = 3;

    // Create a copy of the image data to use as a reference during calculations
    const tempImage = new Uint8ClampedArray(imageData.data);

    for (let y = 1; y < image.height - 1; y++) {
        for (let x = 1; x < image.width - 1; x++) {
            let gradientX = 0;
            let gradientY = 0;

            for (let ky = 0; ky < kernelSize; ky++) {
                for (let kx = 0; kx < kernelSize; kx++) {
                    const pixelX = x + kx - 1;
                    const pixelY = y + ky - 1;
                    const idx = (pixelY * image.width + pixelX) * 4;

                    gradientX += tempImage[idx] * gx[ky * 3 + kx];
                    gradientY += tempImage[idx] * gy[ky * 3 + kx];
                }
            }

            // Compute the magnitude of the gradients
            const magnitude = Math.sqrt(gradientX ** 2 + gradientY ** 2) | 0;

            // Set the new pixel value
            const index = (y * image.width + x) * 4;
            imageData.data[index] = magnitude;     // Red
            imageData.data[index + 1] = magnitude; // Green
            imageData.data[index + 2] = magnitude; // Blue
            // Alpha remains unchanged
        }
    }

    const blurredImageData = new ImageData(imageData.data, image.width, image.height);
    ctx.putImageData(blurredImageData, 0, 0);
}