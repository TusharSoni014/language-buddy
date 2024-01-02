import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResult,
  generateOptions,
  updateTranslatedWordsArray,
  updateWordsArray,
} from "../redux/slices/wordsSlice";
import { RootState } from "../redux/store";
import { AiOutlineLoading } from "react-icons/ai";
import { useTranslateWordsMutation } from "../redux/slices/apiSlice";
import { generate } from "random-words";
import Loader from "../components/Loader";

export default function Learning() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questionCount, setQuestionCount] = useState<number>(0);
  const loading = useSelector((state: RootState) => state.wordsSlice.loading);
  const words = useSelector((state: RootState) => state.wordsSlice.words);
  const language = useSearchParams()[0].get("language") as LangTypes;
  const [translateWords, { data, isError, isLoading, isSuccess }] =
    useTranslateWordsMutation({
      fixedCacheKey: "translateWordsMutation",
    });
  let inputWords: string[];
  const nextQuestionHandler = (): void => {
    setQuestionCount((prev) => prev + 1);
  };

  const loadLearningData = async () => {
    try {
      inputWords = generate(8);
      dispatch(updateWordsArray(inputWords));
      const wordsArray: WordsArray = inputWords.map((word) => {
        return { Text: word };
      });
      const response = await translateWords({
        words: wordsArray,
        lang: language,
      });
      dispatch(updateTranslatedWordsArray(response));
      dispatch(generateOptions());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLearningData();
    dispatch(clearResult());
    if (isSuccess) {
      dispatch(updateWordsArray(inputWords));
    }
  }, []);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="min-h-[calc(100dvh-60px)] flex justify-center items-center text-gray-500">
        Error Occured
      </div>
    );
  if (isSuccess)
    return (
      <div className="__question min-h-[calc(100dvh-60px)] p-3">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <AiOutlineLoading className="animate-spin" />
          </div>
        ) : (
          <div className="__question_container rounded bg-gray-800 p-3 flex flex-col">
            <div className="__btn_container flex gap-2">
              <button
                onClick={
                  questionCount === 0
                    ? () => navigate("/")
                    : () => setQuestionCount((prev) => prev - 1)
                }
                className="bg-blue-500 px-4 py-2 rounded w-fit"
              >
                Back
              </button>
              <button
                onClick={
                  questionCount + 1 === data?.length
                    ? () => navigate("/quiz")
                    : nextQuestionHandler
                }
                className="bg-blue-500 px-4 py-2 rounded w-fit"
              >
                {questionCount + 1 === data?.length ? "Start Quiz" : "Next"}
              </button>
            </div>
            <h1 className=" text-xl my-3 text-center font-bold">
              {language === "hi" && "Hindi"}
              {language === "ja" && "Japanese"}
              {language === "es" && "Spanish"}
              {language === "fr" && "French"}
            </h1>
            <div className="__question_preview w-full text-xl flex justify-center items-center my-4 gap-2">
              {questionCount + 1} - {words[questionCount]} :{" "}
              {data![questionCount]}
            </div>
          </div>
        )}
      </div>
    );
}
