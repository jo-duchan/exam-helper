import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  uid: string;
  displayName: string;
  email: string;
  createdAt: string;
}

interface UserInitState {
  user: UserInfo | null | undefined;
}

const initialState: UserInitState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo | null>) {
      state.user = {
        uid: action.payload!.uid,
        displayName: action.payload!.displayName,
        email: action.payload!.email,
        createdAt: action.payload!.createdAt,
      };
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
