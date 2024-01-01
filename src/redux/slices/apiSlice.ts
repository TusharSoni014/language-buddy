import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://microsoft-translator-text.p.rapidapi.com",
  }),
  tagTypes: ["tag"],
  endpoints: (builder) => ({
    translateWords: builder.mutation<
      string[],
      { words: WordsArray; lang: string }
    >({
      query: ({ words, lang }) => ({
        url: "/translate",
        method: "POST",
        params: {
          "api-version": "3.0",
          "to[0]": lang,
          textType: "plain",
          profanityAction: "NoAction",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
        body: words,
      }),
      transformResponse: (response: TranslatedWordsObject) => {
        return response.map((word) => word.translations[0].text);
      },
    }),
  }),
});

export const { useTranslateWordsMutation } = api;
