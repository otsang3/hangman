import React, { useState } from 'react';
import { wordsArr } from '../apis/WordApi';
import GameRender from './GameRender';
import Result from './Result';
import StartScreen from './StartScreen';

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

        if (state.remainingGuesses > 0 || state.remainingLetters === 0) {
            let keyRepeat = checkForRepeat(letter)
            if (!keyRepeat) {
                if (!state.word.includes(letter)) {
                    return incorrectGuess(letter);
                } else {
                    return correctGuess(letter);
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
            {(state.remainingLetters != 0 || state.remainingGuesses > 0) && state.category &&
            <GameRender 
            capitaliseFirstLetter={capitaliseFirstLetter}
            category={state.category} 
            guesses={state.guesses} 
            guessLetter={guessLetter}
            remainingGuesses={state.remainingGuesses}
            word={state.word}/> 
            }
            {(state.remainingGuesses === 0 || state.remainingLetters === 0) &&
            <Result 
            capitaliseFirstLetter={capitaliseFirstLetter}
            remainingLetters={state.remainingLetters} 
            resetGame={resetGame} 
            word={state.word}/>
            }
        </div>
    )
}

export default GameWindow;