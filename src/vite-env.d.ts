/// <reference types="vite/client" />

type LangTypes = "ja" | "hi" | "es" | "fr";

type WordsObject = {
  word: string;
  meaning: string;
  options: Array<string>;
};

type wordsSliceType = {
  words: Array<WordsObject>;
  result: Array<string>;
  loading: boolean;
  error?: string;
};

type TranslatedWordsObject = {
  translations: { text: string }[];
};
