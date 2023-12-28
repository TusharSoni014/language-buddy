/// <reference types="vite/client" />

type LangTypes = "ja" | "hi" | "es" | "fr";

type WordsArray = Array<{ Text: string }>;

type WordsObject = {
  word: string;
  meaning: string;
  options: Array<string>;
};

type wordsSliceType = {
  words: string[];
  translated: string[];
  result: Array<string>;
  loading: boolean;
  error?: string;
};

type TranslatedWordsObject = {
  translations: { text: string }[];
}[];
