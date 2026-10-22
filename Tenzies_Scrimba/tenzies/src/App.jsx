import { useState } from "react";
import Dice from "./components/Dice";
import GameFinishModal from "./components/GameFinishModal";

export default function App() {
  const [dice, setDice] = useState(() =>
    Array.from({ length: 10 }, generateDie)
  );

  const hasWon = dice.every((die) => die.isHeld && die.value === dice[0].value);
  const [rollCount, setRollCount] = useState(0);

  function reroll() {
    setDice((currentDice) =>
      currentDice.map((die) => (die.isHeld ? die : generateDie()))
    );
    setRollCount((prevCount) => prevCount + 1);
  }

  function toggleHeld(index) {
    setDice((currentDice) =>
      currentDice.map((die, i) =>
        i === index ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function restart() {
    setDice(Array.from({ length: 10 }, generateDie));
    setRollCount(0);
  }



  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <p
        aria-live="polite"
        className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 shadow-sm"
      >
        Rolls: <span className="text-lg font-bold text-blue-600">{rollCount}</span>
      </p>
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        {dice.map((die, index) => (
          <Dice
            key={index}
            value={die.value}
            isHeld={die.isHeld}
            onClick={() => toggleHeld(index)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={reroll}
        className="rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Reroll
      </button>
      {hasWon && <GameFinishModal onRestart={restart} />}
    </main>
  );
}

function generateDie() {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
  };
}