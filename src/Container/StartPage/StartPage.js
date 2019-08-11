import React, { Component } from 'react';

import './StartPage.css';

class StartPage extends Component {
  state = {
    ingredient: '',
    searching: false,
    placeholder: 'Loading...',
    writePlaceholder: 'Type ingredient . . . '
  };

  componentDidUpdate() {
    this.setPlaceholder();
    if (this.state.ingredient.length > 1 && this.state.searching) {
      this.clearIngredient();
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
    this.setState({ ingredient: event.target.value });
  };

  onClickHandler = () => {
    this.props.activateReceipts('recipe');
    this.props.searchRecipes(this.state.ingredient);
    this.changeSearchingState();
  };

  writeFakeCoursor = (placeholder) => {
    setTimeout(() => {
      placeholder.push('|');
      const updatedPlaceholder = placeholder.join('');

      this.setState({
        placeholder: updatedPlaceholder,
      });
    }, 110)
  }

  writePlaceholder = (placeholder, writePlaceholder) => {
    setTimeout(() => {
      placeholder.splice(placeholder.length - 1, 0, writePlaceholder[0]);
      const updatedPlaceholder = placeholder.join('');
      writePlaceholder.shift();
      const updatedWritePlaceholder = writePlaceholder.join('');

      this.setState({
        placeholder: updatedPlaceholder,
        writePlaceholder: updatedWritePlaceholder
      });
    }, 110)
  }

  animatePlaceholder = () => {
    let writePlaceholder = [...this.state.writePlaceholder];
    let placeholder = [...this.state.placeholder];
    if (this.state.placeholder === 'Loading...') {
      placeholder = [];
      this.writeFakeCoursor(placeholder)
    }

    if (writePlaceholder.length >= 1) {
      this.writePlaceholder(placeholder, writePlaceholder)
    } else if (writePlaceholder.length === 0 && placeholder.length === 23) {
      placeholder.pop()
      const updatedPlaceholder = placeholder.join('')
      this.setState({
        placeholder: updatedPlaceholder
      })
    }
  }

  setPlaceholder = () => {
    if (!this.props.disableInput) {
      this.animatePlaceholder()
    }
  }

  render() {
    const StartPageStyle = [
      'startPage__container',
      this.props.isActive
        ? 'startPage__container--active'
        : 'startPage__container--noActive'
    ];
    const buttonContent = 'Search';
    return (
      <div
        className={StartPageStyle.join(' ')}
        onChange={this.mainIngredientInputChangeHandler} >
        <h2>Search Recipe</h2>
        <input
          className='startPage__input'
          disabled={this.props.disableInput}
          placeholder={this.state.placeholder}
          value={this.state.ingredient} />
        {' '}
        <br />
        <button
          className="startPage__button"
          disabled={this.state.ingredient.length < 1}
          onClick={this.onClickHandler} >
          {buttonContent}
        </button>
      </div>
    );
  }
}

export default StartPage;