import { useState, useEffect } from "react";
import Dice from "./components/dice";

export default function App() {

  const [isHeld, setIsHeld] = useState(false);
  const diceValue = [1, 2, 3, 4, 5, 6];
  const dice = Array.from({ length: 10 }, () => {
    return diceValue[Math.floor(Math.random() * diceValue.length)];
  })

  return (
    <main className="flex items-center justify-center">
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        <button className="col-span-5 row-span-2">
        {dice.map((value, index) => (
          <Dice value={value} key={index} status={isHeld} />
        ))}
        </button>
      </div>
    </main>
  );
}