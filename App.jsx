import { useState } from "react"
import { languages } from "./languages"
import clsx from "clsx";


/**
 * Challenge: Bid farewell to each programming language
 * as it gets erased from existance 👋😭
 * 
 * Use the `getFarewellText` function from the new utils.js
 * file to generate the text.
 * 
 * Check hint.md if you're feeling stuck, but do your best
 * to solve the challenge without the hint! 🕵️
 */

export default function Hangman() {
    const [currentWord, setCurrentWord] = useState("react");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost


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

    const gameStatus = () => {
        if (isGameWon) {
            return (
                <>
                    <h2>You Won!</h2>
                    <p>Well done!</p>
                </>
            );
        }
        if (isGameLost) {
            return (
                <>
                    <h2>You Lost!</h2>
                    <p>The correct word was: {currentWord.toUpperCase()}</p>
                </>
            );
        }
    };


    return (
        <main>
            <header>
                <h1>Hangman</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className={gameStatusClass}>
                {gameStatus()}
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