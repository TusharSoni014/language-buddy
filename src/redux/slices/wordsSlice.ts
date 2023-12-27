import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: wordsSliceType = {
  words: [],
  translated: [],
  result: [],
  loading: false,
};

const wordsSlice = createSlice({
  name: "wordsSlice",
  initialState,
  reducers: {
    getWordsRequest: (state) => {
      state.loading = true;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateWordsArray: (state, action: PayloadAction<string[]>) => {
      state.words = action.payload;
    },
    updateTranslatedWordsArray: (state, action: PayloadAction<string[]>) => {
      state.translated = action.payload;
    },
    getWordsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    saveResult: (state, action: PayloadAction<string[]>) => {
      state.result = action.payload;
    },
    clearSlice: (state) => {
      state.loading = false;
      state.error = undefined;
      state.result = [];
      state.words = [];
    },
  },
});

export const {
  clearSlice,
  getWordsFailure,
  getWordsRequest,
  saveResult,
  updateLoading,
  updateWordsArray,
  updateTranslatedWordsArray,
} = wordsSlice.actions;

export default wordsSlice.reducer;
