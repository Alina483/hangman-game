import { useState, useEffect } from "react"
import { languages } from "./languages"
import clsx from "clsx";
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from "react-confetti";
import TimerIcon from "./TimerIcon";
import StormScene from "./StormScene";

/**
 * 
 * Display some other annimation when user lost (maybe rain or smth)
 */
export default function Hangman() {
    const [currentWord, setCurrentWord] = useState(() =>getRandomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);
    const numGuessesLeft = languages.length - 1
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    const [seconds, setSeconds] = useState(0);
    const remainingGuesses = numGuessesLeft - wrongGuessCount;

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const handleLetterClick = (letter) => {
        setGuessedLetters((prev) => [...prev, letter]);
    };

    const letters= currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

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
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
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
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
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

    function startNewGame() {
        setCurrentWord(getRandomWord());
        setGuessedLetters([]);
    }

    useEffect(() => {
        if (isGameOver) return;
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isGameOver]);

    return (
        <main>
            <section className="timer">
                <div className="timer-stack">
                    <span className="timer-row">
                        <TimerIcon size={24} color="#F9F4DA" />
                        <span>{seconds}s</span>
                    </span>
                    <span className="guesses-left">
                        Guesses left: {remainingGuesses}
                    </span>
                </div>
            </section>
            {isGameWon && <Confetti />}
            {isGameLost && <StormScene />}
            <header>
                <h1>Hangman</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section aria-live="polite" role="status" className={gameStatusClass}>
                {renderGameStatus()}
            </section>
            <section className="languages-container">
                {languageElements}
            </section>
            <section className="current-word">
                {letters}   
            </section>
            <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                guessedLetters.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}
        </main>
    )
}