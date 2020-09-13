import React from 'react';

function StartScreen(props) {

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const renderCategories = () => {
        let buttonsArr = [];
        for (let category in props.words[0].categories) {
            buttonsArr.push(<button onClick={() => props.selectCategory(category)}>{capitaliseFirstLetter(category)}</button>)
        }
        // return props.words[0].categories.map((word, index) => {
        //     const category = capitaliseFirstLetter(Object.keys(word)[0]);
        //     return(
        //         <button onClick={() => props.selectCategory(category)} key={index}>{category}</button>
        //     )
        // })
        console.log(buttonsArr);
        return buttonsArr;
    }

    return(
        <div>
            <h2>Please select a category to start playing</h2>
            {renderCategories()}
        </div>
    )
}

export default StartScreen;