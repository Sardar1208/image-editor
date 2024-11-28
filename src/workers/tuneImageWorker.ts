import * as Comlink from 'comlink';
import * as wasm from "../../rust/pkg/rust.js";

// Initialize the WASM module in the worker
// let wasm: any;

// const initWasm = async (wasmBuffer: ArrayBuffer) => {
//     wasm = await WebAssembly.instantiate(wasmBuffer, {});
// };

async function adjustImage(imageData: ImageData, operation: string, value: number) {

    console.log(operation, " : ", value);
    console.log("called ", imageData.data[0], ",", imageData.data[1], ",", imageData.data[2])

    const wasmModule = await fetch('../../rust/pkg/rust_bg.wasm').then(response =>
        response.arrayBuffer()
    );

    // Initialize the WASM module synchronously
    wasm.initSync(wasmModule);

    // Call the WASM function
    switch (operation) {
        case "brightness": {
            wasm.adjust_brightness(new Uint8Array(imageData.data.buffer), value);
            break;
        };
        case "contrast": {
            wasm.adjust_contrast(new Uint8Array(imageData.data.buffer), value);
            break;
        };
        case "saturation": {
            wasm.adjust_saturation(new Uint8Array(imageData.data.buffer), value);
            break;
        }
        case "shadow": {
            wasm.adjust_shadows(new Uint8Array(imageData.data.buffer), value);
            break;
        }
        case "temperature": {
            wasm.adjust_temperature(new Uint8Array(imageData.data.buffer), value);
            break;
        }
        case "tint": {
            wasm.adjust_tint(new Uint8Array(imageData.data.buffer), value);
            break;
        }
        case "vibrance": {
            wasm.adjust_vibrance(new Uint8Array(imageData.data.buffer), value);
            break;
        }
        case "highlights": {
            wasm.adjust_highlights(new Uint8Array(imageData.data.buffer), value);
            break;
        }
    }

    return imageData;
}

// Expose the function using Comlink
Comlink.expose({ adjustImage });