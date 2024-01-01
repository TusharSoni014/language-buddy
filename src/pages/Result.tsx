import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Resultelement from "../components/ResultElement";

const headingData: resultType = {
  ans: "Your Answer",
  correct: "Correct Answer",
  word: "Word",
};

export default function Result() {
  const score = useSelector((state: RootState) => state.wordsSlice.score);
  const result = useSelector((state: RootState) => state.wordsSlice.result);
  const status = useSelector((state: RootState) => state.wordsSlice.quizStatus);
  return (
    <div className="__result_page min-h-[calc(100dvh-60px)] p-3 flex flex-col justify-center items-center">
      <h1 className=" text-3xl text-center">Result</h1>
      <p
        className={`text-center font-bold ${
          status ? "text-green-500" : "text-red-500"
        } `}
      >
        Your Score is {score}
      </p>
      <p className="text-center font-bold my-2">
        You {status ? "Passed" : "Failed"} the test!
      </p>
      <div className="__result_preview max-w-[500px] w-full">
        <Resultelement heading={true} data={headingData} />
        {result.map((item, index) => {
          return <Resultelement heading={false} key={index} data={item} />;
        })}
      </div>
    </div>
  );
}
