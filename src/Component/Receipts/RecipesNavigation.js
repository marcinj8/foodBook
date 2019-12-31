import React from 'react';

import './RecipesNavigation.css'

const recipesNavigation = props => {

    const navigationButtonStyle = [
        'recipesNavigation__container',
        (props.isActive && props.showIsmoreButton) || props.isMouseOver
            ? 'recipesNavigation__container--show'
            : 'recipesNavigation__container--hide'
    ]

    return (
        <div
            className={navigationButtonStyle.join(' ')}
            onMouseEnter={() => props.checkIsMouseOver(true)}
            onMouseLeave={() => props.checkIsMouseOver(false)}>
            <button
                className='recipesNavigation__buttonIsmore'
                onClick={props.showPreviousRecipes}>Previous</button>
            <button
                className='recipesNavigation__buttonIsmore'
                onClick={props.showNextRecipes}>Next</button>
        </div>
    )
}

export default recipesNavigation;