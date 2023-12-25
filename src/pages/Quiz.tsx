import { FormEvent, useState, ChangeEvent } from "react";

export default function Quiz() {
  const [result, setResult] = useState<Array<string>>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setAns(e.target.value);
  };

  const nextQuestionHandler = (e: FormEvent): void => {
    e.preventDefault();
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    setAns("");
  };
  return (
    <div className="min-h-[calc(100dvh-60px)] w-full flex flex-col gap-2 p-5">
      <h1 className="text-2xl font-bold">Quiz</h1>
      <form onSubmit={nextQuestionHandler}>
        <label className="block mb-4 text-sm font-bold text-gray-400">
          Choose an option:
        </label>

        <div className="space-y-2">
          <label className="flex items-center p-2 rounded bg-gray-800 cursor-pointer">
            <input
              type="radio"
              name="option"
              value="option1"
              className="mr-2 text-blue-500"
              required
              onChange={handleChange}
              checked={ans === "option1"}
            />
            Option 1
          </label>

          <label className="flex items-center p-2 rounded bg-gray-800 cursor-pointer">
            <input
              type="radio"
              name="option"
              value="option2"
              className="mr-2 text-blue-500"
              required
              onChange={handleChange}
              checked={ans === "option2"}
            />
            Option 2
          </label>

          <label className="flex items-center p-2 rounded bg-gray-800 cursor-pointer">
            <input
              type="radio"
              name="option"
              value="option3"
              className="mr-2 text-blue-500"
              required
              onChange={handleChange}
              checked={ans === "option3"}
            />
            Option 3
          </label>

          <label className="flex items-center p-2 rounded bg-gray-800 cursor-pointer">
            <input
              type="radio"
              name="option"
              value="option4"
              className="mr-2 text-blue-500"
              required
              onChange={handleChange}
              checked={ans === "option4"}
            />
            Option 4
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-blue-300 transition"
          disabled={ans === ""}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
