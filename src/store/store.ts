import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "store/progress-slice";
import toastReducer from "store/toast-slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    progress: progressReducer,
    toast: toastReducer,
  },
});

export default store;
