import React from 'react';

function StartScreen(props) {

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const renderCategories = () => {
        let index = 0;
        let buttonsArr = [];
        for (let category in props.words[0].categories) {
            buttonsArr.push(<button key={index} onClick={() => props.selectCategory(category)}>{capitaliseFirstLetter(category)}</button>);
            index += 1;
        }
        return buttonsArr;
    }

    return(
        <div>
            <h2>Select a category to start playing</h2>
            {renderCategories()}
        </div>
    )
}

export default StartScreen;