import React from 'react';

import './RecipeDetail.css';

const recipeDetail = props => {
    
    const ingredients = [];
    props.reciptDetail.ingredients.map( (ingredient, index) => {
        ingredients.push(
            <li key={index}>{ingredient.text} - weight: {Math.round(ingredient.weight)}g</li>
        )
    })

    return (
        <div className='recipeDetail__block'>
            <h3>{props.reciptDetail.label}</h3>
            <div>
                <h4>Ingredients:</h4>
                <ul style={{'textAlign':'left'}}>
                    {ingredients}
                </ul>
            </div>
        </div>
    )
}

export default recipeDetail;