import React from 'react';

function GameRender(props) {

    return(
        <div>
            <h3>Type a letter to start guessing</h3>
            <p>Category: {props.category}</p>
        </div>
    )
}

export default GameRender;