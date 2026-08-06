import { FaArrowDown } from "react-icons/fa";

export default function ScrollToBottom({
  visible,
  onClick,
}) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-36
        right-10
        z-40
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-slate-200
        bg-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
      "
    >
      <FaArrowDown />
    </button>
  );
}