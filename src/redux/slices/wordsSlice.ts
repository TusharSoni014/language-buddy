import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: wordsSliceType = {
  words: [],
  translated: {},
  options: [],
  result: [],
  loading: false,
  score: 0,
  quizStatus: false,
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
    generateOptions: (state) => {
      const words = state.words;
      state.options = words.map((word) => {
        let randomWords: string[] = [];
        randomWords.push(word);
        const wordExists = (word: string) => randomWords.includes(word);
        while (randomWords.length < 4) {
          const randomIndex: number = Math.floor(Math.random() * words.length);
          const randomWord: string = words[randomIndex];
          if (randomWord !== word && !wordExists(randomWord)) {
            randomWords.push(randomWord);
          }
        }
        randomWords = randomWords.slice().sort(() => Math.random() - 0.5);
        return randomWords;
      });
    },

    updateResult: (state, action: PayloadAction<resultType>) => {
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
    calculateResult: (state) => {
      const result = state.result;
      let score: number = 0;
      result.map((answer) => {
        if (answer.ans === answer.correct) score++;
      });
      state.score = score;
      if (score >= (state.words.length * 70) / 100) state.quizStatus = true;
      else state.quizStatus = false;
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
  calculateResult,
} = wordsSlice.actions;

export default wordsSlice.reducer;
