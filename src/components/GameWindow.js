import React, { useState } from 'react';
import { wordsArr } from '../apis/WordApi';
import GameRender from './GameRender';
import StartScreen from './StartScreen';

function GameWindow() {

    const initialState = {
        category: "",
        guesses: [],
        playGame: false,
        remainingGuesses: 5,
        remainingLetters: "",
        word: "",
        wrongLetters: []
    }

    const [state, setState] = useState(initialState);

    const getWord = (category) => {
        const categoryArr = wordsArr[0].categories[category]
        const randomNum = Math.floor(Math.random() * categoryArr.length)
        const randomWord = categoryArr[randomNum]
        setState(prevState => {
            return {
                ...prevState,
                remainingLetters: randomWord.length,
                word: randomWord
            }
        })
    }

    const checkForRepeat = (letter) => {

        if (state.guesses.length === 0) {
            return false;
        } else {
            for (let char of state.guesses) {
                console.log(char);
                console.log(letter);
                if (char === letter) {
                    return true;
                } 
            }
            return false;
        }
    }

    const correctGuess = (letter) => {
        const wordSplit = state.word.split("");
        let occurrence = 0;
        for (let char of wordSplit) {
            if (letter === char) {
                occurrence += 1
            }
        }
        setState(prevState => {
            return {
                ...prevState,
                guesses: [...prevState.guesses, letter],
                remainingLetters: prevState.remainingLetters - occurrence
            }
        })
    }

    const incorrectGuess = (letter) => {
        setState(prevState => {
            return {
                ...prevState,
                guesses: [...prevState.guesses, letter],
                remainingGuesses: prevState.remainingGuesses - 1,
                wrongLetters: [...prevState.wrongLetters, letter]
            }
        })
    }

    const guessLetter = (letter) => {

            let keyRepeat = checkForRepeat(letter)
            if (!keyRepeat) {
                if (!state.word.includes(letter)) {
                    return incorrectGuess(letter);
                } else {
                    return correctGuess(letter);
                }
            }
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
            {console.log(state.guesses)}
            {state.category && state.remainingGuesses > 0 ? 
            <GameRender 
            category={state.category} 
            guesses={state.guesses} 
            guessLetter={guessLetter}
            word={state.word}
            wrongLetters={state.wrongLetters}/> 
            :
            <StartScreen getWord={getWord} selectCategory={selectCategory} words={wordsArr}/>
            }
        </div>
    )
}

export default GameWindow;