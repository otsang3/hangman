import React from 'react';
import Hangman from './Hangman';

function StartScreen(props) {

    const renderCategories = () => {
        let index = 0;
        let buttonsArr = [];
        for (let category in props.words[0].categories) {
            buttonsArr.push(<button key={index} onClick={() => props.selectCategory(category)}>{props.capitaliseFirstLetter(category)}</button>);
            index += 1;
        }
        return buttonsArr;
    }

    return(
        <div>
            <h2>Select a category to start playing</h2>
            <div className="categories-list">
                {renderCategories()}
            </div>
            <div style={{textAlign: "center", marginTop: "2.5em"}}>
                <Hangman/>
            </div>
            
        </div>
    )
}

export default StartScreen;