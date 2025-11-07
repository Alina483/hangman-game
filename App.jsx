import { useState } from "react"
import { languages } from "./languages"
import clsx from "clsx";
import { getFarewellText } from "./utils";


/**Challenge: Disable the keyboard when the game is over/** */

export default function Hangman() {
    const [currentWord, setCurrentWord] = useState("react");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const handleLetterClick = (letter) => {
        setGuessedLetters((prev) => [...prev, letter]);
    };

    
    const letters = currentWord.split("").map((letter, index) => (
        <span key={index} className="letter-box">
            {guessedLetters.includes(letter) ? letter : ""}
        </span>
    ));

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        
        return (
            <button
                className={className}
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={isGameOver}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message" >
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }
        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } 
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
        return null
    }

    return (
        <main>
            <header>
                <h1>Hangman</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className={gameStatusClass}>
                {renderGameStatus()}
            </section>
            <section className="languages-container">
                {languageElements}
            </section>
            <section className="current-word">
                {letters}   
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver && <button className="new-game">New Game</button>}
        </main>
    )
}