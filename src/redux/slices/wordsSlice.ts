import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: wordsSliceType = {
  words: [],
  translated: {},
  options: [],
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
    // generateOptions: (state) => {
    //   const words = state.words;
    //   words.map((word) => {
    //     let randomWords: string[] = [];
    //     const wordExists = (word: string) => randomWords.includes(word);
    //     while (randomWords.length < 3) {
    //       const randomIndex: number = Math.floor(Math.random() * words.length);
    //       const randomWord: string = words[randomIndex];
    //       if (!wordExists(randomWord)) {
    //         randomWords.push(randomWord);
    //       }
    //     }
    //     randomWords.push(word);
    //     state.options.push(randomWords);
    //   });
    // },
    generateOptions: (state) => {
      const words = state.words;
    
      state.options = words.map((word) => {
        let randomWords: string[] = [];
        randomWords.push(word);
        const wordExists = (word: string) => randomWords.includes(word);
    
        while (randomWords.length < 4) {
          const randomIndex: number = Math.floor(Math.random() * words.length);
          const randomWord: string = words[randomIndex];
    
          // Check if randomWord is not equal to the original word
          if (randomWord !== word && !wordExists(randomWord)) {
            randomWords.push(randomWord);
          }
        }
    
        // Return the modified inner array for this word
        return randomWords;
      });
    },
    

    updateResult: (
      state,
      action: PayloadAction<{ word: string; ans: string }>
    ) => {
      state.result.push(action.payload);
    },
    clearResult: (state) => {
      state.result = [];
    },
    updateTranslatedWordsArray: (state, action: PayloadAction<Object>) => {
      state.translated = action.payload;
    },
    getWordsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
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
  updateLoading,
  updateWordsArray,
  updateResult,
  updateTranslatedWordsArray,
  clearResult,
  generateOptions,
} = wordsSlice.actions;

export default wordsSlice.reducer;
