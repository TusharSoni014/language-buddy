import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white flex justify-center items-center font-bold">
      <Link to="/">Language Buddy</Link>
    </nav>
  );
}
