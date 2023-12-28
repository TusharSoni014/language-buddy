import { useEffect } from "react";
import LanguageItem from "../components/LanguageItem";
import { useDispatch } from "react-redux";
import { updateWordsArray } from "../redux/slices/wordsSlice";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateWordsArray([]));
  }, []);
  return (
    <div className="flex flex-col w-full p-3 min-h-[calc(100dvh-60px)]">
      <h2 className="text-2xl text-center font-bold">
        Welcome to Language Buddy
      </h2>
      <p className="text-center text-gray-400">
        Learn new words everyday in your favorite language for free!
      </p>
      <small className="text-center text-xs text-red-500">
        This project is made in Typescript + React + Tailwind
      </small>
      <div className="__language_container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 my-5">
        {languages.map((langItem, index) => {
          return (
            <LanguageItem
              key={index}
              code={langItem.code}
              name={langItem.name}
            />
          );
        })}
      </div>
      <p className="text-center w-full">Choose One Language from above</p>
    </div>
  );
}
