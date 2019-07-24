import React, {Component} from 'react';

import './StartPage.css';

class StartPage extends Component {
  state = {
    ingredient: '',
    searching: false
  };

  componentDidUpdate () {
    if (this.state.ingredient.length > 1 && this.state.searching) {
      this.clearIngredient ();
    }
  }

  clearIngredient = () => {
      this.setState({
          ingredient: '',
      })
      this.changeSearchingState()
  };

  changeSearchingState = () => {
      this.setState({
          searching: !this.state.searching
      })
  }

  mainIngredientInputChangeHandler = event => {
    this.setState ({ingredient: event.target.value});
  };

  onClickHandler = () => {
    this.props.activateReceipts ('recipe');
    this.props.searchRecipes (this.state.ingredient);
    this.changeSearchingState();
  };

  render () {
    const StartPageStyle = [
      'startPage__container',
      this.props.isActive
        ? 'startPage__container--active'
        : 'startPage__container--noActive'
    ];
    const buttonContent = 'Search';
    return (
      <div
        className={StartPageStyle.join (' ')}
        onChange={this.mainIngredientInputChangeHandler}
      >
        <h2>Search Recipe</h2>
        <input
          disabled={this.props.disableInput}
          placeholder={
            this.props.disableInput ? 'Loading...' : 'type ingredient'
          }
          value={this.state.ingredient}
        />
        {' '}
        <br />
        <button
          className="startPage__button"
          disabled={this.state.ingredient.length < 1}
          onClick={this.onClickHandler}
        >
          {buttonContent}
        </button>
      </div>
    );
  }
}

export default StartPage;