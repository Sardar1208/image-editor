import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducers/imageReducer";

export default configureStore({
  reducer: {
    imageReducer: imageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["imageState/addImageLayer"],
      },
    }),
});