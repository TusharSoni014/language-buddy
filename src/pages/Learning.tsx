import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GiSpeaker } from "react-icons/gi";
import { translateWords } from "../utils/functions";

export default function Learning() {
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState<number>(0);
  const language = useSearchParams()[0].get("language") as LangTypes;
  const nextQuestionHandler = (): void => {
    setQuestionCount((prev) => prev + 1);
  };

  const loadLearningData = async () => {
    const learningData = await translateWords({ lang: language });
    console.log(learningData);
  };
  useEffect(() => {
    loadLearningData();
  }, []);

  return (
    <div className="__question min-h-[calc(100dvh-60px)] p-3">
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
              questionCount === 7
                ? () => navigate("/quiz")
                : nextQuestionHandler
            }
            className="bg-blue-500 px-4 py-2 rounded w-fit"
          >
            {questionCount === 7 ? "Start Quiz" : "Next"}
          </button>
        </div>

        <div className="__question_preview w-full text-xl flex justify-center items-center my-4 gap-2">
          {questionCount} - {"Sample Word"} : {"lol"}{" "}
          <GiSpeaker className="cursor-pointer text-xl text-blue-500" />
        </div>
      </div>
    </div>
  );
}
