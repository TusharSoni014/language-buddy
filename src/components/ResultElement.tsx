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
      <p className=" text-[20px]">
        {data.ans === data.correct ? (
          <IoCheckmarkCircleSharp className="text-green-500"/>
        ) : (
          <IoCloseCircleSharp className="text-red-500"/>
        )}
      </p>
    </div>
  );
}
