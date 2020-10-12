import React, { useEffect } from 'react';

function GameRender(props) {

    const keypressHandler = (e) => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        if (alphabet.includes(e.key.toLowerCase())) {
            props.guessLetter(e.key.toLowerCase());
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
                <span style={{color: "grey"}} key={index}>{guess.toUpperCase()}</span>
            )
        })
    }

    const renderHeader = () => {
        if (props.remainingLetters === 0 || props.remainingGuesses === 0) {
            return(
                <h3>Click "Play again" to choose a new word!</h3>
            )
        }
        return(
            <h3>Type a letter to start guessing</h3>
        )
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
            {renderHeader()}
            <div className="subheader-container">
                <p>Category: {props.capitaliseFirstLetter(props.category)}</p>
                <p>Remaining Guesses: {props.remainingGuesses}</p>
            </div>
            
            <label style={{marginLeft: "1.05em"}}>Used Letters: </label>
            {renderGuesses()}
            <br/>
            <div className="answer">
            {renderLetters()}
            </div>
            
        </div>
    )
}

export default GameRender;