import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Toast, ToastListState } from "types/overlay";

const initialState: ToastListState = {
  list: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Toast>) {
      state.list.push(action.payload);
    },
    remove(state, action: PayloadAction<string>) {
      const target = state.list.findIndex(({ id }) => id === action.payload);
      if (target === -1) {
        return;
      }
      state.list.splice(target, 1);
    },
  },
});

export const { add, remove } = toastSlice.actions;
export default toastSlice.reducer;
