import { useState } from "react"
import { languages } from "./languages"
import clsx from "clsx";


/**
 * Goal: Add in the incorrect guesses mechanism to the game
 * 
 * Challenge:
 * Conditionally render either the "won" or "lost" statuses
 * from the design, both the text and the styles, based on the
 * new derived variables.
 * 
 * Note: We always want the surrounding `section` to be rendered,
 * so only change the content inside that section. Otherwise the
 * content on the page would jump around a bit too much.
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
            {guessedLetters.includes(letter) ? letter : "_"}
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


    return (
        <main>
            <header>
                <h1>Hangman</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You Won!</h2>
                <p>Well done!</p>
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