import { createSlice } from "@reduxjs/toolkit";

type wordsSliceType = {
  words: Array<string>;
};

const initialState: wordsSliceType = {
  words: [],
};

const wordsSlice = createSlice({
  name: "wordsSlice",
  initialState,
  reducers: {},
});

export default wordsSlice.reducer;