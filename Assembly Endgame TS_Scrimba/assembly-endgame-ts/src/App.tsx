import { useState } from "react"
import { languages } from "./languages.ts"
import { getRandomWord } from "./utils"

import ConfettiContainer from "./components/ConfettiContainer.tsx"
import Header from './components/Header.tsx'
import GameStatus from "./components/GameStatus.tsx";
import LanguageChips from "./components/LanguageChips.tsx";
import WordLetters from "./components/WordLetters.tsx";
import AriaLiveStatus from "./components/AriaLiveStatus.tsx";
import Keyboard from "./components/Keyboard.tsx";
import NewGameButton from "./components/NewGameButton.tsx";

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = useState<string>((): string => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])


  // Derived values
  const numGuessesLeft: number = languages.length - 1
  const wrongGuessCount: number =
    guessedLetters.filter((letter: string): boolean => !currentWord.includes(letter)).length
  const isGameWon: boolean =
    currentWord.split("").every((letter: string): boolean => guessedLetters.includes(letter))
  const isGameLost: boolean = wrongGuessCount >= numGuessesLeft
  const isGameOver: boolean = isGameWon || isGameLost
  const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect: boolean = (lastGuessedLetter && !currentWord.includes(lastGuessedLetter)) ? true : false;

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter: string): void {
    setGuessedLetters((prevLetters: string[]): string[] =>
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
    )
  }

  function startNewGame(): void {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  return (
    <main>
      <ConfettiContainer isGameWon={isGameWon} />
      <Header />

      <GameStatus
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        isLastGuessIncorrect={isLastGuessIncorrect}
        wrongGuessCount={wrongGuessCount}
      />

      <LanguageChips
        languages={languages}
        wrongGuessCount={wrongGuessCount}
      />

      <WordLetters
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
      />

      <AriaLiveStatus
        currentWord={currentWord}
        lastGuessedLetter={lastGuessedLetter}
        guessedLetters={guessedLetters}
        numGuessesLeft={numGuessesLeft}
      />

      <Keyboard
        alphabet={alphabet}
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        isGameOver={isGameOver}
        addGuessedLetter={addGuessedLetter}
      />

      <NewGameButton
        isGameOver={isGameOver}
        startNewGame={startNewGame}
      />
    </main>
  )
}
