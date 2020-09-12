import React, { useState } from 'react';
import { wordsArr } from '../apis/WordApi';
import GameRender from './GameRender';
import StartScreen from './StartScreen';

function GameWindow() {

    const initialState = {
        category: "",
        correctLetters: [],
        playGame: false,
        remainingLetters: [],
        word: "",
        wrongLetters: []
    }

    const [state, setState] = useState(initialState);

    const selectCategory = (category) => {
        const saveCategory = category;
        console.log(saveCategory);
        setState(prevState => {
            return {
                ...prevState,
                category: category
            }
        })
    }

    return(
        <div>
            {state.category ? 
            <GameRender/> 
            :
            <StartScreen selectCategory={selectCategory} words={wordsArr}/>
            }
        </div>
    )
}

export default GameWindow;