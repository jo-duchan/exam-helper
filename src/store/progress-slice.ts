import { createSlice } from "@reduxjs/toolkit";

export interface ProgressState {
  visible: boolean;
}

const initialState: ProgressState = {
  visible: false,
};

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    show(state) {
      state.visible = true;
    },
    hide(state) {
      state.visible = false;
    },
  },
});

export const { show, hide } = progressSlice.actions;
export default progressSlice.reducer;
