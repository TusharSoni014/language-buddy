import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loader() {
  return (
    <div className="w-full bg-black text-white flex justify-center items-center min-h-[calc(100dvh-60px)]">
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
}
