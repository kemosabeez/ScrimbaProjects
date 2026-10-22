import { useState } from "react";
import Dice from "./components/Dice";

export default function App() {
  const [dice, setDice] = useState(() =>
    Array.from({ length: 10 }, generateDie)
  );

  function reroll() {
    setDice((currentDice) =>
      currentDice.map((die) => (die.isHeld ? die : generateDie()))
    );
  }

  function toggleHeld(index) {
    setDice((currentDice) =>
      currentDice.map((die, i) =>
        i === index ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  return (
    <main className="flex flex-col items-center justify-center gap-6">
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
    </main>
  );
}

function generateDie() {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
  };
}