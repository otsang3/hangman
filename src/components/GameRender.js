import React from 'react';

function GameRender(props) {

    const renderLetters = () => {
        let lettersArr = []
        const wordSplit = props.word.split("")
        wordSplit.map((letter, index) => {

            for (let guess of props.guesses) {
                if (guess === letter) {
                    return lettersArr.push(
                        <span>{letter.toUpperCase()}</span>
                    )
                } 
            }
            return lettersArr.push(
                <span>_</span>
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