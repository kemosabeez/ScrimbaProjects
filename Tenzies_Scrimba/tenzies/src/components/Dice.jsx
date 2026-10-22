
export default function Dice({ value, isHeld, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isHeld}
      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-md text-2xl font-bold shadow transition hover:scale-110 ${
        isHeld ? "bg-green-300" : "bg-white text-slate-900"
      }`}
    >
      {value}
    </button>
  );
}