import React from 'react';

import './Receipt.css';

const receipt = props => {
    let recipeBlockStyle = ['recipe__block'];
    if(props.activeRecipe ) {
        recipeBlockStyle.push('recipe__block--active');
    } else {
        recipeBlockStyle.push('recipe__block--noActive');
    }

    let healthLabels = 'no halth label';
    if(props.receipt.healthLabels) {
        healthLabels =[];
        props.receipt.healthLabels.map(item => {
            return healthLabels.push(
                <span className='receipe__label' key={item}> #{item}</span>
            )
        }) 
    }

    return (
        <div className={recipeBlockStyle.join(' ')} onClick={props.clicked}>
            <h3>{props.receipt.label}</h3> 
            <img className='recipe__img' src={props.receipt.image} alt=""/>
            <div>
                {healthLabels}
            </div>
        </div>
    )
}

export default receipt;