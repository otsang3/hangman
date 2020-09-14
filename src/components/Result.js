import React from 'react';

function Result(props) {

    return(
        <div>
            {props.remainingLetters === 0 ?
            <h1>Well Done!</h1>
            :
            <h1>Unlucky!</h1>
            }
            <h3>The word was {props.word}</h3>
            <button onClick={props.resetGame}>Play again</button>
        </div>
    )
}

export default Result;