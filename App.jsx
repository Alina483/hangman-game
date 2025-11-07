import React, { useState } from "react"
import { languages } from "./languages"
import clsx from "clsx";


/**
 * Goal: Allow the user to start guessing the letters
 * 
 * Challenge: Update the keyboard when a letter is right
 * or wrong.
 * 
 * Bonus: use the `clsx` package to easily add conditional 
 * classNames to the keys of the keyboard. Check the docs 
 * to learn how to use it 📖
 */





export default function Hangman() {
    const [currentWord, setCurrentWord] = useState("react");

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const [guessedLetters, setGuessedLetters] = useState([]);

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
                {languages.map((lang) => (
                    <div
                        key={lang.name}
                        className="language-chip"
                        style={{
                            backgroundColor: lang.backgroundColor,
                            color: lang.color,
                        }}
                    >
                        {lang.name}
                    </div>
                ))}
            </section>
            <section className="current-word">
                {letters}   
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            <button className="new-game">New Game</button>
        </main>
    )
}