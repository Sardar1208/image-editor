import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ImageInfo = {
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
}

interface LayersInterface {
  layers: {
    imageInfo?: ImageInfo,
    name: string;
  }[],
}

const initialState: LayersInterface = {
  layers: [],
}

export const midSlice = createSlice({
  name: 'imageState',
  initialState,
  reducers: {
    addImageLayer: (state, action: PayloadAction<{ imageInfo?: ImageInfo; name: string }>) => {
      const { imageInfo, name } = action.payload;
      if (imageInfo) {
        state.layers.push({
          imageInfo,
          name,
        });
      } else {
        state.layers.push({
          name,
        });
      }
    },
    removeImageLayer: (state, action) => {
      state.layers.pop(action.payload);
    },
  },
});

export const {
  addImageLayer,
  removeImageLayer,
} = midSlice.actions;

export default midSlice.reducer;