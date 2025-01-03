import store from "../store";

export function getAdjustmentValue(operation: string) {
  const state = store.getState().tuneImageReducer;

  for (let i = 0; i < state.adjustments.length; i++) {
    const item = state.adjustments[i];
    if (item.operation == operation) {
      return item.value;
    }
  }

  return 0;
}
