import { RefObject } from "react";
import * as wasm from "../../rust/pkg/rust.js";

export default function greyScale(canvasRef: RefObject<HTMLCanvasElement | null>, image: HTMLImageElement) {
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d")!;
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    wasm.greyscale_image(new Uint8Array(imageData.data.buffer));
    ctx.putImageData(imageData, 0, 0);
}