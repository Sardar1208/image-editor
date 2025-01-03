import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdjustmentType } from "../types/T_ProcessTypes";

type Adjustments = {
  operation: AdjustmentType;
  value: number;
};

interface TuneImageInterface {
  adjustments: Adjustments[];
}

const initialState: TuneImageInterface = {
  adjustments: [],
};

export const tuneImageSlice = createSlice({
  name: "tune_image",
  initialState,
  reducers: {
    updateAdjustment: (
      state,
      action: PayloadAction<{ operation: AdjustmentType; value: number }>
    ) => {
      const { operation, value } = action.payload;
      for (let i = 0; i < state.adjustments.length; i++) {
        const item = state.adjustments[i];
        if (item.operation == operation) {
          if (Math.abs(value) == 0) {
            state.adjustments.splice(i, 1);
            return;
          }
          state.adjustments[i] = {
            operation: operation,
            value: value,
          };
          return;
        }
      }

      if (Math.abs(value) != 0) {
        state.adjustments.push({
          operation,
          value,
        });
      }
    },
    clearAdjustments: (state) => {
      state.adjustments = [];
    },
  },
});

export const { updateAdjustment, clearAdjustments } = tuneImageSlice.actions;

export default tuneImageSlice.reducer;
