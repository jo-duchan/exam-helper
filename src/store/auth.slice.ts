import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  uid: string;
  displayName: string;
  email: string;
  createdAt: string;
}

interface UserInitState {
  user: User | null;
}

const initialState: UserInitState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
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
