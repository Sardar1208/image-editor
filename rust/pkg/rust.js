let wasm;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
 * @param {Uint8Array} image_data
 */
export function greyscale_image(image_data) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.greyscale_image(ptr0, len0, addHeapObject(image_data));
}

/**
 * @param {Uint8Array} image_data
 * @param {number} width
 * @param {number} height
 */
export function gaussian_blur(image_data, width, height) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.gaussian_blur(ptr0, len0, addHeapObject(image_data), width, height);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} width
 * @param {number} height
 */
export function edge_detection(image_data, width, height) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.edge_detection(ptr0, len0, addHeapObject(image_data), width, height);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} brightness
 */
export function adjust_brightness(image_data, brightness) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.adjust_brightness(ptr0, len0, addHeapObject(image_data), brightness);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} contrast
 */
export function adjust_contrast(image_data, contrast) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.adjust_contrast(ptr0, len0, addHeapObject(image_data), contrast);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} saturation
 */
export function adjust_saturation(image_data, saturation) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.adjust_saturation(ptr0, len0, addHeapObject(image_data), saturation);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} shadow_factor
 */
export function adjust_shadows(image_data, shadow_factor) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.adjust_shadows(ptr0, len0, addHeapObject(image_data), shadow_factor);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} temperature
 */
export function adjust_temperature(image_data, temperature) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.adjust_temperature(ptr0, len0, addHeapObject(image_data), temperature);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} tint
 */
export function adjust_tint(image_data, tint) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.adjust_tint(ptr0, len0, addHeapObject(image_data), tint);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} vibrance
 */
export function adjust_vibrance(image_data, vibrance) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.adjust_vibrance(ptr0, len0, addHeapObject(image_data), vibrance);
}

/**
 * @param {Uint8Array} image_data
 * @param {number} highlights
 */
export function adjust_highlights(image_data, highlights) {
    var ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.adjust_highlights(ptr0, len0, addHeapObject(image_data), highlights);
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_copy_to_typed_array = function(arg0, arg1, arg2) {
        new Uint8Array(getObject(arg2).buffer, getObject(arg2).byteOffset, getObject(arg2).byteLength).set(getArrayU8FromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_debug_69675dd374e2c249 = function(arg0) {
        console.debug(getObject(arg0));
    };
    imports.wbg.__wbg_error_53abcd6a461f73d8 = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_info_f073b719c8035bbf = function(arg0) {
        console.info(getObject(arg0));
    };
    imports.wbg.__wbg_log_f740dc2253ea759b = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_warn_41503a1c2194de89 = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedUint8ArrayMemory0 = null;



    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('rust_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
