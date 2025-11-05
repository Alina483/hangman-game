import React, { useState } from "react"
import { languages } from "./languages"
/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: 
 * Display the keyboard ⌨️. Use <button>s for each letter
 * since it'll need to be clickable and tab-accessible.
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
        </main>
    )
}