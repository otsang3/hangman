import React, { useEffect } from 'react';

function GameRender(props) {

    const keypressHandler = (e) => {
        console.log(props.guesses);
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        if (alphabet.includes(e.key)) {
            props.guessLetter(e.key);
        } else {
            console.log("invalid key")
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", keypressHandler);
        return () => window.removeEventListener("keypress", keypressHandler)  
    }, [props.guesses])

    const renderGuesses = () => {
        return props.guesses.map((guess, index) => {
            return(
                <span key={index}>{guess.toUpperCase()}</span>
            )
        })
    }

    const renderLetters = () => {
        let lettersArr = []
        const wordSplit = props.word.split("")
        wordSplit.map((letter, index) => {

            for (let guess of props.guesses) {
                if (guess === letter) {
                    return lettersArr.push(
                        <span key={index}>{letter.toUpperCase()}</span>
                    )
                } 
            }
            return lettersArr.push(
                <span key={index}>_</span>
            )
        })
        return lettersArr;
    }

    return(
        <div>
            <h3>Type a letter to start guessing</h3>
            <p>Category: {props.category}</p>
            <label>Used Letters: </label>
            {renderGuesses()}
            <br/>
            {renderLetters()}
        </div>
    )
}

export default GameRender;