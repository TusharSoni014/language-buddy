import { configureStore } from "@reduxjs/toolkit";
import wordsSlice from "./slices/wordsSlice";
import { api } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    wordsSlice: wordsSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(api.middleware),
  devTools: !import.meta.env.PROD,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
