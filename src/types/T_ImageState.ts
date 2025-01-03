export type OriginalImage = {
    imageElement?: HTMLImageElement,
    imageData?: ImageData,
}

export type ImageState = {
    originalImage: OriginalImage | null;
    currentImage: {type: string; imageData: ImageData} | null;
    snapshots: {type: string; imageData: ImageData}[];
};