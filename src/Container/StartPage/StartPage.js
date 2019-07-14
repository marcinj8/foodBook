import React, { Component } from 'react';

import './StartPage.css'

class StartPage extends Component {
    state = {
        ingredient: ''
    }

    mainIngredientInputChangeHandler = event => {
        this.setState({ingredient: event.target.value})
    }

    render() {

        const StartPageStyle = ['startPage__container',
            this.props.isActive
            ? 'startPage__container--active'
            : 'startPage__container--noActive'
        ];
        
        const buttonContent = (
            this.props.disableSearchButton
            ? 'Loading..'
            : 'Search'
        )

        return (
            <div 
                className={StartPageStyle.join(' ')}
                onChange={this.mainIngredientInputChangeHandler}>
                <h2>Search Recipe</h2>
                <input placeholder='type ingredient'/> <br />
                <button
                    className='startPage__button'
                    disabled={this.props.disableSearchButton && this.state.ingredient.length > 0}
                    onClick={() => this.props.searchRecipes(this.state.ingredient)}>{buttonContent}</button>
            </div>
        )
    }
}

export default StartPage;

// disabled dla inputa kiedy nie ma api key, disabled dla buttona kiedy input jest pusty