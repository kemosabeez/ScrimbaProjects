

export default function Dice({ value, isHeld }) {
    return (
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-white text-2xl font-bold text-slate-900 shadow transition duration-150 hover:scale-110 hover:bg-blue-100 hover:shadow-md">
            {value}
        </div>
    );
}x