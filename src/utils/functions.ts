import axios from "axios";
import { generate } from "random-words";

export const translateWords = async ({ lang }: { lang: LangTypes }) => {
  try {
    const words = generate(8).map((word) => {
      return { Text: word };
    });
    console.log(words);
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
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
      data: words,
    };

    const response = await axios.request(options);
    return {
      words: words,
      translated: response.data.map((word: TranslatedWordsObject) => {
        return word.translations[0].text;
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
