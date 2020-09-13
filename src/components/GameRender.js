import React, { useEffect } from 'react';

function GameRender(props) {

    const keypressHandler = (e) => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        if (alphabet.includes(e.key)) {
            console.log("valid key");
        } else {
            console.log("invalid key")
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", (e) => keypressHandler(e))
    }, [])

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
            {renderLetters()}
        </div>
    )
}

export default GameRender;