import * as wasm from "../../rust/pkg/rust.js";

async function initWasm() {
    const wasmModule = await fetch('../../rust/pkg/rust_bg.wasm').then(response =>
        response.arrayBuffer()
    );

    // Initialize the WASM module synchronously
    wasm.initSync(wasmModule);
}

function drawImageToCanvas(zoom: number, canvasRef: React.RefObject<HTMLCanvasElement | null>, image: HTMLImageElement, editorRef: React.RefObject<any>) {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    console.log("editor width: ", editorRef.current.offsetWidth);

    // Define the maximum dimensions for the displayed image
    const maxDisplayWidth = editorRef.current.offsetWidth;
    const maxDisplayHeight = editorRef.current.offsetHeight;

    const zoom_factor = 0.5 + ((zoom - 50) / 100);

    // Calculate the scaling factor while maintaining the aspect ratio
    const scale = Math.min(maxDisplayWidth / image.width, maxDisplayHeight / image.height);

    console.log("imageWidth: ", image.height);
    console.log("scale: ", scale);

    // Set the canvas dimensions according to the scale
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;

    console.log("canvasWidth: ", canvas.height);

    ctx.drawImage(image, 0, 0, canvas.width * zoom_factor, canvas.height * zoom_factor);
}

function adjust_zoom(zoom: number, canvasRef: React.RefObject<HTMLCanvasElement | null>, editorRef: React.RefObject<any>, image: HTMLImageElement) {
    const canvas = canvasRef.current!;

    // Define the maximum dimensions for the displayed image
    const maxDisplayWidth = editorRef.current.offsetWidth;
    const maxDisplayHeight = editorRef.current.offsetHeight;

    // Calculate the scaling factor while maintaining the aspect ratio
    const scale = Math.min(maxDisplayWidth / image.width, maxDisplayHeight / image.height);

    const zoom_factor = 0.5 + ((zoom - 50) / 100);

    console.log("zoom factor: ", zoom_factor);

    // Set the canvas dimensions according to the scale
    canvas.width = image.width * scale * zoom_factor;
    canvas.height = image.height * scale * zoom_factor;
}



export {
    initWasm,
    drawImageToCanvas,
    adjust_zoom,
};