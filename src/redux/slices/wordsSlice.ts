import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: wordsSliceType = {
  words: [],
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
    getWordsResponse: (state, action: PayloadAction<WordsObject[]>) => {
      state.loading = false;
      state.words = action.payload;
    },
    getWordsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveResult: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
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
  getWordsResponse,
  saveResult,
} = wordsSlice.actions;

export default wordsSlice.reducer;
