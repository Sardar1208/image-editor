import { clearAdjustments } from "../reducers/tuneImageReducer";
import store from "../store";
import { ImageState } from "../types/T_ImageState";

function setCurrentImage(
  setState: React.Dispatch<React.SetStateAction<ImageState>>,
  currentImageType: string,
  currentImageData: ImageData
) {
  setState((prevState) => ({
    ...prevState,
    currentImage: {
      type: currentImageType,
      imageData: currentImageData,
    },
  }));
}

function clearCurrentImage(
  setState: React.Dispatch<React.SetStateAction<ImageState>>
) {
  setState((prevState) => ({
    ...prevState,
    currentImage: null,
  }));
}

function applyCurrentImage(
  setState: React.Dispatch<React.SetStateAction<ImageState>>
) {
  setState((prevState) => ({
    ...prevState,
    currentImage: null,
    snapshots: prevState.currentImage
      ? [...prevState.snapshots, prevState.currentImage]
      : prevState.snapshots,
  }));

  store.dispatch(clearAdjustments());
}

function setOriginalImage(
  setState: React.Dispatch<React.SetStateAction<ImageState>>,
  imageData: ImageData | null,
  imageElement: HTMLImageElement | null
) {
  setState((state) => {
    return {
      originalImage: {
        imageElement: imageElement ?? state.originalImage?.imageElement,
        imageData: imageData ?? state.originalImage?.imageData,
      },
      currentImage: state.currentImage,
      snapshots: state.snapshots,
    };
  });
}

function getImageDataforOP(state: ImageState) {
  if (state.snapshots.length > 0) {
    return state.snapshots[state.snapshots.length - 1].imageData;
  } else {
    return state.originalImage?.imageData;
  }
}

// function getAdjustmentSequence(
//   state: ImageState,
//   operation: AdjustmentType,
//   value: number
// ) {
//   let lastValidIndex = state.snapshots.length;
//   let initialImageData: ImageData | undefined =
//     state.snapshots.length > 0
//       ? state.snapshots[state.snapshots.length - 1].imageData
//       : state.originalImage?.imageData;
//   const sequence: {
//     operation: AdjustmentType;
//     value: number;
//   }[] = [
//     {
//       operation: operation,
//       value: value,
//     },
//   ];

//   if (state.snapshots.length <= 0) {
//     return {
//       initialImageData,
//       sequence,
//     };
//   }

//   for (let i = 0; i < state.snapshots.length; i++) {
//     const item = state.snapshots[i];
//     if (item.operation == operation) {
//       lastValidIndex = i + 1;
//       initialImageData = item.imageData;
//       break;
//     }
//   }

//   for (let i = lastValidIndex; i < state.snapshots.length; i++) {
//     const item = state.snapshots[i];
//     sequence.push({
//       operation: item.operation,
//       value: item.value,
//     });
//   }

//   return {
//     initialImageData,
//     sequence,
//   };
// }

// function updateSnapshots(
//   setState: React.Dispatch<React.SetStateAction<ImageState>>,
//   operation: AdjustmentType,
//   value: number,
//   imageData: ImageData
// ) {
//   setState((prevState) => {
//     for (let i = 0; i < prevState.snapshots.length; i++) {
//       const item = prevState.snapshots[i];
//       if (item.operation == operation) {
//         item.imageData = imageData;
//         item.value = value;
//         return prevState;
//       }
//     }

//     prevState.snapshots.push({
//       operation: operation,
//       value: value,
//       imageData: imageData,
//     });

//     return prevState;
//   });
// }

// function clearSnapshots(
//   setState: React.Dispatch<React.SetStateAction<ImageState>>
// ) {
//   setState((state) => {
//     return {
//       originalImage: state.originalImage,
//       snapshots: [],
//     };
//   });
// }

export {
  setOriginalImage,
  getImageDataforOP,
  // getAdjustmentSequence,
  // updateSnapshots,
  // clearSnapshots,
  setCurrentImage,
  clearCurrentImage,
  applyCurrentImage,
};
