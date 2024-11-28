/* tslint:disable */
/* eslint-disable */
/**
 * @param {Uint8Array} image_data
 */
export function greyscale_image(image_data: Uint8Array): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} width
 * @param {number} height
 */
export function gaussian_blur(image_data: Uint8Array, width: number, height: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} width
 * @param {number} height
 */
export function edge_detection(image_data: Uint8Array, width: number, height: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} brightness
 */
export function adjust_brightness(image_data: Uint8Array, brightness: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} contrast
 */
export function adjust_contrast(image_data: Uint8Array, contrast: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} saturation
 */
export function adjust_saturation(image_data: Uint8Array, saturation: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} shadow_factor
 */
export function adjust_shadows(image_data: Uint8Array, shadow_factor: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} temperature
 */
export function adjust_temperature(image_data: Uint8Array, temperature: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} tint
 */
export function adjust_tint(image_data: Uint8Array, tint: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} vibrance
 */
export function adjust_vibrance(image_data: Uint8Array, vibrance: number): void;
/**
 * @param {Uint8Array} image_data
 * @param {number} highlights
 */
export function adjust_highlights(image_data: Uint8Array, highlights: number): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly greyscale_image: (a: number, b: number, c: number) => void;
  readonly gaussian_blur: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly edge_detection: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly adjust_brightness: (a: number, b: number, c: number, d: number) => void;
  readonly adjust_contrast: (a: number, b: number, c: number, d: number) => void;
  readonly adjust_saturation: (a: number, b: number, c: number, d: number) => void;
  readonly adjust_shadows: (a: number, b: number, c: number, d: number) => void;
  readonly adjust_temperature: (a: number, b: number, c: number, d: number) => void;
  readonly adjust_tint: (a: number, b: number, c: number, d: number) => void;
  readonly adjust_vibrance: (a: number, b: number, c: number, d: number) => void;
  readonly adjust_highlights: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
