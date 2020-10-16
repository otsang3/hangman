import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wordsArr } from '../apis/WordApi';
import GameRender from './GameRender';
import Result from './Result';
import StartScreen from './StartScreen';


toast.configure();
function GameWindow() {

    const initialState = {
        category: "",
        guesses: [],
        playGame: false,
        remainingGuesses: 6,
        remainingLetters: "",
        word: "",
        wrongLetters: []
    }

    const [state, setState] = useState(initialState);

    const notify = () => {
        toast.error('Letter has already been used!',{
            position: "top-center",
            autoClose: 1750,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false
        })
    }

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

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const checkForRepeat = (letter) => {

        if (state.guesses.length === 0) {
            return false;
        } else {
            for (let char of state.guesses) {
                if (char === letter) {
                    notify();
                    return true;
                } 
            }
            return false;
        }
    }

    const correctGuess = (letter, occurrence) => {
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

        if (state.remainingGuesses > 0 || state.remainingLetters === 0) {
            let keyRepeat = checkForRepeat(letter)
            if (!keyRepeat) {
                if (!state.word.includes(letter)) {
                    return incorrectGuess(letter);
                } else {
                    let count = 0;
                    state.word.split("").forEach(char => char === letter ? count ++ : null);
                    return correctGuess(letter, count);
                }
            }
        }        
    }

    const resetGame = () => {
        setState(initialState)
    };
    

    const selectCategory = (category) => {
        setState(prevState => {
            return {
                ...prevState,
                category: category,
                playGame: true
            }
        }, getWord(category))
    }

    return(
        <div>
            {!state.playGame &&
            <StartScreen 
            capitaliseFirstLetter={capitaliseFirstLetter}
            getWord={getWord} 
            selectCategory={selectCategory} 
            words={wordsArr}/>
            }
            {(state.remainingLetters !== 0 || state.remainingGuesses > 0) && state.category &&
            <GameRender 
            capitaliseFirstLetter={capitaliseFirstLetter}
            category={state.category} 
            guesses={state.guesses} 
            guessLetter={guessLetter}
            remainingGuesses={state.remainingGuesses}
            remainingLetters={state.remainingLetters}
            word={state.word}/> 
            }
            {(state.remainingGuesses === 0 || state.remainingLetters === 0) &&
            <Result 
            capitaliseFirstLetter={capitaliseFirstLetter}
            remainingLetters={state.remainingLetters} 
            resetGame={resetGame} 
            word={state.word}/>
            }
            <ToastContainer style={{width: "18em", textAlign: "center"}} limit={1}/>
        </div>
    )
}

export default GameWindow;