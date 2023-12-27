import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GiSpeaker } from "react-icons/gi";
import { translateWords } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoading,
  updateTranslatedWordsArray,
  updateWordsArray,
} from "../redux/slices/wordsSlice";
import { RootState } from "../redux/store";
import { AiOutlineLoading } from "react-icons/ai";

export default function Learning() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questionCount, setQuestionCount] = useState<number>(0);
  const loading = useSelector((state: RootState) => state.wordsSlice.loading);
  const words = useSelector((state: RootState) => state.wordsSlice.words);
  const translatedWords = useSelector(
    (state: RootState) => state.wordsSlice.translated
  );
  const language = useSearchParams()[0].get("language") as LangTypes;
  const nextQuestionHandler = (): void => {
    setQuestionCount((prev) => prev + 1);
  };

  const loadLearningData = async () => {
    dispatch(updateLoading(true));
    try {
      const learningData = await translateWords({ lang: language });
      dispatch(
        updateWordsArray(learningData?.words?.map((words) => words?.Text)!)
      );
      dispatch(updateTranslatedWordsArray(learningData?.translated));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  useEffect(() => {
    loadLearningData();
  }, []);

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
                questionCount + 1 === words.length
                  ? () => navigate("/quiz")
                  : nextQuestionHandler
              }
              className="bg-blue-500 px-4 py-2 rounded w-fit"
            >
              {questionCount + 1 === words.length ? "Start Quiz" : "Next"}
            </button>
          </div>
          <div className="__question_preview w-full text-xl flex justify-center items-center my-4 gap-2">
            {questionCount + 1} - {words[questionCount]} :{" "}
            {translatedWords[questionCount]}
            <GiSpeaker className="cursor-pointer text-xl text-blue-500" />
          </div>
        </div>
      )}
    </div>
  );
}
