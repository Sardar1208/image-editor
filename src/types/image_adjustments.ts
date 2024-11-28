export type AdjustmentType = "brightness" | "contrast" | "saturation" | "shadow" | "temperature" | "tint" | "vibrance" | "highlights";

export type OriginalImage = {
    imageElement?: HTMLImageElement,
    imageData?: ImageData,
}

export type ImageState = {
    originalImage: OriginalImage | null;
    snapshots: { operation: AdjustmentType; value: number, imageData: ImageData }[];
};