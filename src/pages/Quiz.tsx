import { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  calculateResult,
  clearResult,
  updateResult,
} from "../redux/slices/wordsSlice";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const words = useSelector((state: RootState) => state.wordsSlice.words);
  const translatedWords: any = useSelector(
    (state: RootState) => state.wordsSlice.translated
  );
  const options = useSelector((state: RootState) => state.wordsSlice.options);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAns(e.target.value);
  };

  useEffect(() => {
    dispatch(clearResult());
  }, []);

  const nextQuestionHandler = (e: FormEvent): void => {
    e.preventDefault();
    if (count + 1 === translatedWords?.data?.length) {
      dispatch(calculateResult());
      navigate("/result");
    } else {
      dispatch(
        updateResult({
          word: translatedWords?.data[count],
          ans: ans,
          correct: words[count],
        })
      );
      setCount((prev) => prev + 1);
      setAns("");
    }
  };
  if (translatedWords.data === undefined)
    return (
      <div className="min-h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
        <p className="text-gray-600">Something went wrong</p>
        <button
          className="bg-blue-500 px-4 py-2 rounded w-fit"
          onClick={() => navigate("/")}
        >
          Reload
        </button>
      </div>
    );
  return (
    <div className="min-h-[calc(100dvh-60px)] w-full flex flex-col gap-2 p-5">
      <h1 className="text-2xl font-bold">Quiz</h1>
      <form onSubmit={nextQuestionHandler}>
        <label className="block mb-4 font-bold">
          Choose correct meaning for this word:{" "}
          <span className="uppercase">{translatedWords?.data[count]}</span>
        </label>

        <div className="space-y-2">
          {options[count]?.map((item, index) => {
            return (
              <>
                <label
                  key={index}
                  className="flex items-center p-2 rounded bg-gray-800 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="option"
                    value={item}
                    className="mr-2 text-blue-500"
                    required
                    onChange={handleChange}
                    checked={ans === item}
                  />
                  {item}
                </label>
              </>
            );
          })}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-blue-300 transition"
          disabled={ans === ""}
        >
          {count + 1 === translatedWords?.data?.length
            ? "Show Result"
            : "Submit"}
        </button>
      </form>
    </div>
  );
}
