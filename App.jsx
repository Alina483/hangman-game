import React, { useState } from "react"
import { languages } from "./languages"
/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: 
 * 1. Save a "currentWord" in state. Initialize as "react".
 * 2. Map over the letters of the word (you'll need to turn 
 *    the string into an array of letters first) and display
 *    each one as a <span>. Capitalize the letters when
 *    displaying them.
 * 3. Style to look like the design. You can get the underline 
 *    effect on the box using `border-bottom`.
 */



export default function Hangman() {
    const [currentWord, setCurrentWord] = useState("react");

    const letters = currentWord.split("").map((letter, index) => (
        <span key={index} className="letter-box">
            {letter}
        </span>
    ));

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
        </main>
    )
}