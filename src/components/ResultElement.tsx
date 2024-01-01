interface ResultPropType {
  data: resultType;
  heading: boolean;
}

export default function Resultelement({ data, heading }: ResultPropType) {
  return (
    <div className="__result_element flex justify-between items-center border-[1px] border-gray-500 p-1 px-2">
      <p>{data.word}</p>
      <p>{data.ans}</p>
      <p>{data.correct}</p>
    </div>
  );
}
