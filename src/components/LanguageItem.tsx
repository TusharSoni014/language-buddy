import { useNavigate } from "react-router-dom";

type LanguageItemProp = {
  name: string;
  code: string;
};
export default function LanguageItem({ name, code }: LanguageItemProp) {
  const navigate = useNavigate();

  const handleLanguageNavigate = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };
  return (
    <div
      onClick={() => handleLanguageNavigate(code)}
      className="cursor-pointer bg-slate-600 rounded p-2 py-4 transition text-center hover:scale-105 hover:bg-slate-700"
    >
      <p>{name}</p>
    </div>
  );
}
