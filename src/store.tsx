import { configureStore } from "@reduxjs/toolkit";
import tuneImageReducer from "./reducers/tuneImageReducer";

const store = configureStore({
  reducer: {
    tuneImageReducer: tuneImageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["imageState/addImageLayer"],
      },
    }),
});

export default store;

export type IRootState = ReturnType<typeof store.getState>