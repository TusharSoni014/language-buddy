import { configureStore } from "@reduxjs/toolkit";
import wordsSlice from "./slices/wordsSlice";

const store = configureStore({
  reducer: {
    wordsSlice: wordsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
