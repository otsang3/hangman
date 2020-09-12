import React from 'react';

function StartScreen(props) {

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const renderCategories = () => {
        return props.words[0].categories.map((word, index) => {
            const category = capitaliseFirstLetter(Object.keys(word)[0]);
            return(
                <button onClick={() => props.selectCategory(category)} key={index}>{category}</button>
            )
        })
    }

    return(
        <div>
            <h2>Please select a category to start playing</h2>
            {renderCategories()}
        </div>
    )
}

export default StartScreen;