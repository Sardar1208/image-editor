use js_sys::Array;
use log::debug;
use std::cmp;
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

#[wasm_bindgen]
pub fn greyscale_image(image_data: &mut [u8]) {
    console_log::init_with_level(log::Level::Debug).unwrap();
    debug!("Debug level log message {}", image_data.len());

    for pixel in image_data.chunks_exact_mut(4) {
        let average: u8 = ((pixel[0] as f32 * 0.299)
            + (pixel[1] as f32 * 0.587)
            + (pixel[2] as f32 * 0.114)) as u8;
        pixel[0] = average;
        pixel[1] = average;
        pixel[2] = average;
    }
}

#[wasm_bindgen]
pub fn gaussian_blur(image_data: &mut [u8], width: usize, height: usize) {
    let kernel: [f32; 9] = [1.0, 2.0, 1.0, 2.0, 4.0, 2.0, 1.0, 2.0, 1.0];
    let kernel_size = 3;
    let mut temp_image = image_data.to_vec();

    for y in 1..(height - 1) {
        for x in 1..(width - 1) {
            let mut sum_r = 0.0;
            let mut sum_g = 0.0;
            let mut sum_b = 0.0;

            for ky in 0..kernel_size {
                for kx in 0..kernel_size {
                    let pixel_x = (x + kx - 1) as usize;
                    let pixel_y = (y + ky - 1) as usize;
                    let idx = (pixel_y * width + pixel_x) * 4;

                    let weight = kernel[ky * kernel_size + kx];
                    sum_r += image_data[idx] as f32 * weight;
                    sum_g += image_data[idx + 1] as f32 * weight;
                    sum_b += image_data[idx + 2] as f32 * weight;
                }
            }

            let i: usize = (y * width + x) * 4;
            temp_image[i] = (sum_r / 16.0) as u8;
            temp_image[i + 1] = (sum_g / 16.0) as u8;
            temp_image[i + 2] = (sum_b / 16.0) as u8;
        }
    }

    image_data.copy_from_slice(&temp_image);
}

#[wasm_bindgen]
pub fn edge_detection(image_data: &mut [u8], width: usize, height: usize) {
    greyscale_image(image_data);

    let gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    let gy = [1, 2, 1, 0, 0, 0, -1, -2, -1];
    let kernel_size = 3;
    let temp_image = image_data.to_vec();

    for y in 1..(height - 1) {
        for x in 1..(width - 1) {
            let mut gradient_x = 0;
            let mut gradient_y = 0;

            for ky in 0..kernel_size {
                for kx in 0..kernel_size {
                    let pixel_x = (x + kx - 1) as usize;
                    let pixel_y = (y + ky - 1) as usize;
                    let idx = (pixel_y * width + pixel_x) * 4;

                    gradient_x += temp_image[idx] as i32 * gx[ky * 3 + kx];
                    gradient_y += temp_image[idx] as i32 * gy[ky * 3 + kx];
                }
            }

            // Compute the magnitude
            let magnitude = ((gradient_x.pow(2) + gradient_y.pow(2)) as f32).sqrt() as u8;

            // Set the pixel value in the output image
            let index = (y * width + x) * 4;
            image_data[index] = magnitude;
            image_data[index + 1] = magnitude;
            image_data[index + 2] = magnitude;
        }
    }
}

#[wasm_bindgen]
pub fn adjust_brightness(image_data: &mut [u8], brightness: i8) {
    for pixel in image_data.chunks_exact_mut(4) {
        pixel[0] = cmp::max(
            0,
            cmp::min(255 as i16, (pixel[0] as i16) + (brightness as i16)) as u8,
        );
        pixel[1] = cmp::max(
            0,
            cmp::min(255 as i16, (pixel[1] as i16) + (brightness as i16)) as u8,
        );
        pixel[2] = cmp::max(
            0,
            cmp::min(255 as i16, (pixel[2] as i16) + (brightness as i16)) as u8,
        );
    }
}

#[wasm_bindgen]
pub fn adjust_contrast(image_data: &mut [u8], contrast: f32) {
    let contrast_factor = ((259.0) * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

    for pixel in image_data.chunks_exact_mut(4) {
        for i in 0..3 {
            let value = pixel[i] as f32;
            let new_value = contrast_factor * (value - 128.0) + 128.0;
            // Clip to the 0–255 range and assign back to the pixel
            pixel[i] = cmp::max(0, cmp::min(255, new_value.round() as i16)) as u8;
        }
    }
}

#[wasm_bindgen]
pub fn adjust_saturation(image_data: &mut [u8], saturation: f32) {
    for pixel in image_data.chunks_exact_mut(4) {
        let gray =
            0.299 * (pixel[0] as f32) + 0.587 * (pixel[1] as f32) + 0.114 * (pixel[2] as f32);

        for i in 0..3 {
            let value = pixel[i] as f32;
            // Adjust the saturation by scaling the distance from gray
            let new_value = gray + (value - gray) * (1.0 + saturation);
            // Clip to the 0–255 range
            pixel[i] = new_value.clamp(0.0, 255.0).round() as u8;
        }
    }
}

#[wasm_bindgen]
pub fn adjust_shadows(image_data: &mut [u8], shadow_factor: f32) {
    for pixel in image_data.chunks_exact_mut(4) {
        for i in 0..3 {
            let value = pixel[i] as f32;

            // Brighten shadows for darker pixels
            let new_value = if value < 128.0 {
                (value + shadow_factor * (128.0 - value)).clamp(0.0, 255.0)
            } else {
                value // Leave highlights unchanged
            };

            pixel[i] = new_value as u8;
        }
    }
}

#[wasm_bindgen]
pub fn adjust_temperature(image_data: &mut [u8], temperature: f32) {
    for pixel in image_data.chunks_exact_mut(4) {
        let red_adjustment = temperature;
        let blue_adjustment = -temperature;

        pixel[0] = ((pixel[0] as f32 + red_adjustment).clamp(0.0, 255.0)) as u8; // Red channel
        pixel[2] = ((pixel[2] as f32 + blue_adjustment).clamp(0.0, 255.0)) as u8;
        // Blue channel
    }
}

#[wasm_bindgen]
pub fn adjust_tint(image_data: &mut [u8], tint: f32) {
    for pixel in image_data.chunks_exact_mut(4) {
        let green_adjustment = tint;

        pixel[1] = ((pixel[1] as f32 + green_adjustment).clamp(0.0, 255.0)) as u8;
        // Green channel
    }
}

#[wasm_bindgen]
pub fn adjust_vibrance(image_data: &mut [u8], vibrance: f32) {
    for pixel in image_data.chunks_exact_mut(4) {
        let r = pixel[0] as f32;
        let g = pixel[1] as f32;
        let b = pixel[2] as f32;

        // Calculate the maximum intensity
        let max = r.max(g).max(b);

        // Apply vibrance adjustment only to less saturated colors
        for i in 0..3 {
            let delta = max - pixel[i] as f32;
            if delta > 0.0 {
                let adjustment = delta * vibrance / 255.0; // Scale adjustment
                pixel[i] = ((pixel[i] as f32 + adjustment).clamp(0.0, 255.0)) as u8;
            }
        }
    }
}

#[wasm_bindgen]
pub fn adjust_highlights(image_data: &mut [u8], highlights: f32) {
    for pixel in image_data.chunks_exact_mut(4) {
        for i in 0..3 {
            let value = pixel[i] as f32;

            // Apply highlights adjustment only to bright pixels
            let factor = if value > 128.0 {
                1.0 + highlights / 100.0
            } else {
                1.0
            };

            pixel[i] = ((value * factor).clamp(0.0, 255.0)) as u8;
        }
    }
}

#[wasm_bindgen]
pub fn batch_adjust(image_data: &mut [u8], sequence: &JsValue, values: &[f32]) {
    let sequence = Array::from(sequence);

    for pixel in image_data.chunks_exact_mut(4) {
        for (idx, adjustment) in sequence.clone().iter().enumerate() {
            let value = values[idx];
            if let Some(string) = adjustment.as_string() {
                match string.as_str() {
                    "brightness" => {
                        // Convert pixel to i16 for calculations
                        let r = pixel[0] as i16;
                        let g = pixel[1] as i16;
                        let b = pixel[2] as i16;

                        // Weighted luminance adjustment
                        let luminance =
                            (0.299 * r as f32 + 0.587 * g as f32 + 0.114 * b as f32) as i16;

                        // Adjust each channel proportionally to the luminance
                        pixel[0] =
                            cmp::max(0, cmp::min(255, r + value as i16 * luminance / 255)) as u8;
                        pixel[1] =
                            cmp::max(0, cmp::min(255, g + value as i16 * luminance / 255)) as u8;
                        pixel[2] =
                            cmp::max(0, cmp::min(255, b + value as i16 * luminance / 255)) as u8;
                    }
                    "contrast" => {
                        let contrast_factor =
                            ((259.0) * (value + 255.0)) / (255.0 * (259.0 - value));

                        for i in 0..3 {
                            let pixel_value = pixel[i] as f32;
                            let new_value = contrast_factor * (pixel_value - 128.0) + 128.0;
                            // Clip to the 0–255 range and assign back to the pixel
                            pixel[i] = cmp::max(0, cmp::min(255, new_value.round() as i16)) as u8;
                        }
                    }
                    "saturation" => {
                        let gray = 0.299 * (pixel[0] as f32)
                            + 0.587 * (pixel[1] as f32)
                            + 0.114 * (pixel[2] as f32);

                        for i in 0..3 {
                            let pixel_value = pixel[i] as f32;
                            // Adjust the saturation by scaling the distance from gray
                            let new_value = gray + (pixel_value - gray) * (1.0 + value);
                            // Clip to the 0–255 range
                            pixel[i] = new_value.clamp(0.0, 255.0).round() as u8;
                        }
                    }
                    "shadows" => {
                        for i in 0..3 {
                            let pixel_value = pixel[i] as f32;

                            // Brighten shadows for darker pixels
                            let new_value = if pixel_value < 128.0 {
                                (pixel_value + value * (128.0 - pixel_value)).clamp(0.0, 255.0)
                            } else {
                                pixel_value // Leave highlights unchanged
                            };

                            pixel[i] = new_value as u8;
                        }
                    }
                    "temperature" => {
                        let red_adjustment = value;
                        let blue_adjustment = -value;

                        pixel[0] = ((pixel[0] as f32 + red_adjustment).clamp(0.0, 255.0)) as u8; // Red channel
                        pixel[2] = ((pixel[2] as f32 + blue_adjustment).clamp(0.0, 255.0)) as u8;
                    }
                    "tint" => {
                        let green_adjustment = value;

                        pixel[1] = ((pixel[1] as f32 + green_adjustment).clamp(0.0, 255.0)) as u8;
                    }
                    "vibrance" => {
                        let r = pixel[0] as f32;
                        let g = pixel[1] as f32;
                        let b = pixel[2] as f32;

                        // Calculate the maximum intensity
                        let max = r.max(g).max(b);

                        // Apply vibrance adjustment to less saturated colors
                        for i in 0..3 {
                            let channel = pixel[i] as f32;
                            let delta = max - channel;

                            if delta > 0.0 {
                                let adjustment = delta * value / 255.0; // Scale adjustment by vibrance factor
                                pixel[i] = ((channel + adjustment).clamp(0.0, 255.0)) as u8;
                            }
                        }
                    }
                    "highlights" => {
                        for i in 0..3 {
                            let pixel_value = pixel[i] as f32;

                            // Apply highlights adjustment only to bright pixels
                            let factor = if pixel_value > 128.0 {
                                1.0 + value / 100.0
                            } else {
                                1.0
                            };

                            pixel[i] = ((pixel_value * factor).clamp(0.0, 255.0)) as u8;
                        }
                    }
                    _ => continue,
                }
            }
        }
    }
}
