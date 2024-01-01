/// <reference types="vite/client" />

type LangTypes = "ja" | "hi" | "es" | "fr";

type WordsArray = Array<{ Text: string }>;

interface resultType {
  word: string;
  ans: string;
  correct: string;
}

interface wordsSliceType {
  words: string[];
  translated: Object;
  options: Array<string[]>;
  result: resultType[];
  loading: boolean;
  error?: string;
  score: number;
  quizStatus: boolean;
}

type TranslatedWordsObject = {
  translations: { text: string }[];
}[];
