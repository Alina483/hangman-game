import React, { useState } from "react"
import { languages } from "./languages"
/**
 * Goal: Allow the user to start guessing the letters
 * 
 * Challenge: Create a new array in state to hold user's
 * guessed letters. When the user chooses a letter, add
 * that letter to this state array.
 * 
 * Don't worry about whether it was a right or wrong 
 * guess yet.
 */




export default function Hangman() {
    const [currentWord, setCurrentWord] = useState("react");

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const letters = currentWord.split("").map((letter, index) => (
        <span key={index} className="letter-box">
            {letter}
        </span>
    ));

     const keyboardElements = alphabet.split("").map(letter => (
        <button>{letter.toUpperCase()}</button>
    ))

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