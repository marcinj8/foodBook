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
            
        return (
            <div 
                className={StartPageStyle.join(' ')}
                onChange={this.mainIngredientInputChangeHandler}>
                <h2>Search Recipe</h2>
                <input placeholder='type ingredient'/> <br />
                <button onClick={() => this.props.searchRecipes(this.state.ingredient)}>Search</button>
            </div>
        )
    }
}

export default StartPage;