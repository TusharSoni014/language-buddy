import { FormEvent, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateResult } from "../redux/slices/wordsSlice";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const translatedWords: any = useSelector(
    (state: RootState) => state.wordsSlice.translated
  );
  const options = useSelector((state: RootState) => state.wordsSlice.options);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAns(e.target.value);
  };

  const nextQuestionHandler = (e: FormEvent): void => {
    e.preventDefault();
    if (count + 1 === translatedWords.data.length) {
      navigate("/result");
    } else {
      dispatch(updateResult({ word: translatedWords.data[count], ans: ans }));
      setCount((prev) => prev + 1);
      setAns("");
    }
  };
  return (
    <div className="min-h-[calc(100dvh-60px)] w-full flex flex-col gap-2 p-5">
      <h1 className="text-2xl font-bold">Quiz</h1>
      <form onSubmit={nextQuestionHandler}>
        <label className="block mb-4 font-bold">
          Choose correct meaning for this word:{" "}
          <span className="uppercase">{translatedWords.data[count]}</span>
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
          {count + 1 === translatedWords.data.length ? "Show Result" : "Submit"}
        </button>
      </form>
    </div>
  );
}
