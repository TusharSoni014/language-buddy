import { IoCloseCircleSharp, IoCheckmarkCircleSharp } from "react-icons/io5";

interface ResultPropType {
  data: resultType;
  heading: boolean;
}

export default function Resultelement({ data, heading }: ResultPropType) {
  return (
    <div className="__result_element flex justify-between items-center border-[1px] border-gray-500 p-1 px-2">
      <p className={`${heading && "font-bold"}`}>{data.word}</p>
      <p className={`${heading && "font-bold"}`}>{data.ans}</p>
      <p className={`${heading && "font-bold"}`}>{data.correct}</p>
      {heading ? (
        <div className="flex justify-center items-center">
          <IoCheckmarkCircleSharp className="text-green-500 text-xs" />/
          <IoCloseCircleSharp className="text-red-500 text-xs" />
        </div>
      ) : (
        <p className="text-[20px]">
          {data.ans === data.correct ? (
            <IoCheckmarkCircleSharp className="text-green-500" />
          ) : (
            <IoCloseCircleSharp className="text-red-500" />
          )}
        </p>
      )}
    </div>
  );
}
