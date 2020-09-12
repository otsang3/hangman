import React, { useState } from 'react';

function GameWindow() {

    const initialState = {
        category: "",
        correctLetters: [],
        playGame: false,
        remainingLetters: [],
        word: "",
        wrongLetters: []
    }

    const [state, setState] = setState(initialState);

    return(
        <div>

        </div>
    )
}

export default GameWindow;