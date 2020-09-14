import React from 'react';

function Result(props) {

    return(
        <div className="result-container">
            {props.remainingLetters === 0 ?
            <h1>Well Done!</h1>
            :
            <div>
                <h1>Unlucky!</h1>
                <h3>The word was {props.capitaliseFirstLetter(props.word)}</h3>
            </div>
            }
            
            <button className="reset-button" onClick={props.resetGame}>Play again</button>
        </div>
    )
}

export default Result;