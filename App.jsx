import React from "react"
import { languages } from "./languages"
/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: Create the language chips. Use the
 * `languages.js` file to pull in the array of
 * languages to use, which contains the language
 * name, background color, and text color.
 * 
 * Hint for layout: use a flex container that can wrap
 * to layout the languages.
 */



export default function Hangman() {
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
        </main>
    )
}