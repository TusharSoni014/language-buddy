/// <reference types="vite/client" />

type LangTypes = "ja" | "hi" | "es" | "fr";

type WordsArray = Array<{ Text: string }>;

type wordsSliceType = {
  words: string[];
  translated: Object;
  options: Array<string[]>;
  result: { word: string; ans: string }[];
  loading: boolean;
  error?: string;
};

type TranslatedWordsObject = {
  translations: { text: string }[];
}[];
