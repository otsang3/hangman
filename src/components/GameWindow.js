import React, { useState } from 'react';
import { wordsArr } from '../apis/WordApi';
import GameRender from './GameRender';
import StartScreen from './StartScreen';

function GameWindow() {

    const initialState = {
        category: "",
        guesses: ["a", "b", "d", "e", "s"],
        playGame: false,
        remainingGuesses: 5,
        remainingLetters: [],
        word: "",
        wrongLetters: []
    }

    const [state, setState] = useState(initialState);

    const getWord = (category) => {
        const categoryArr = wordsArr[0].categories[category]
        const randomNum = Math.floor(Math.random() * categoryArr.length)
        setState(prevState => {
            return {
                ...prevState,
                word: categoryArr[randomNum]
            }
        })
    }

    const incorrectGuess = () => {
        setState(prevState => {
            return {
                ...prevState,
                remainingGuesses: prevState.remainingGuesses - 1
            }
        })
    }

    const selectCategory = (category) => {
        setState(prevState => {
            return {
                ...prevState,
                category: category
            }
        }, getWord(category))
    }

    return(
        <div>
            {state.category ? 
            <GameRender 
            category={state.category} 
            guesses={state.guesses} 
            incorrectGuess={incorrectGuess}
            word={state.word}/> 
            :
            <StartScreen getWord={getWord} selectCategory={selectCategory} words={wordsArr}/>
            }
        </div>
    )
}

export default GameWindow;