import { AdjustmentType, ImageState } from "../types/image_adjustments";

function setOriginalImage(setState: React.Dispatch<React.SetStateAction<ImageState>>, imageData: ImageData | null, imageElement: HTMLImageElement | null) {
    setState(state => {
        return {
            originalImage: {
                imageElement: imageElement ?? state.originalImage?.imageElement,
                imageData: imageData ?? state.originalImage?.imageData,
            },
            snapshots: state.snapshots,
        }
    })
}

function getImageDataforOP(state: ImageState, operation: AdjustmentType) {
    for (let i = 0; i < state.snapshots.length; i++) {
        const item = state.snapshots[i];
        if (item.operation == operation) {
            return i > 0 ? state.snapshots[i - 1].imageData : state.originalImage?.imageData;
        }
    }

    if (state.snapshots.length > 0) {
        return state.snapshots[state.snapshots.length - 1].imageData;
    } else {
        return state.originalImage?.imageData;
    }
}

function getAdjustmentSequence(state: ImageState, operation: AdjustmentType, value: number) {
    let lastValidIndex = state.snapshots.length;
    let initialImageData: ImageData | undefined = state.snapshots.length > 0 ? state.snapshots[state.snapshots.length - 1].imageData : state.originalImage?.imageData;
    let sequence: {
        operation: AdjustmentType,
        value: number,
    }[] = [
            {
                operation: operation,
                value: value,
            }
        ];

    if (state.snapshots.length <= 0) {
        return {
            initialImageData,
            sequence,
        }
    }

    for (let i = 0; i < state.snapshots.length; i++) {
        const item = state.snapshots[i];
        if (item.operation == operation) {
            lastValidIndex = i + 1;
            initialImageData = item.imageData;
            break;
        }
    }

    for (let i = lastValidIndex; i < state.snapshots.length; i++) {
        const item = state.snapshots[i];
        sequence.push({
            operation: item.operation,
            value: item.value,
        })
    }

    return {
        initialImageData,
        sequence,
    }
}

function updateSnapshots(setState: React.Dispatch<React.SetStateAction<ImageState>>, operation: AdjustmentType, value: number, imageData: ImageData) {
    setState(prevState => {
        for (let i = 0; i < prevState.snapshots.length; i++) {
            const item = prevState.snapshots[i];
            if (item.operation == operation) {
                item.imageData = imageData;
                item.value = value;
                return prevState;
            }
        }

        prevState.snapshots.push({
            operation: operation,
            value: value,
            imageData: imageData,
        });

        return prevState;
    })
}

function clearSnapshots(setState: React.Dispatch<React.SetStateAction<ImageState>>) {
    setState(state => {
        return {
            originalImage: state.originalImage,
            snapshots: [],
        }
    })
}

export {
    setOriginalImage,
    getImageDataforOP,
    getAdjustmentSequence,
    updateSnapshots,
    clearSnapshots,
}