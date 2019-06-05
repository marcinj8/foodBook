import React from 'react';

const recipeDetail = props => {
    
    const ingredients = [];
    props.reciptDetail.ingredients.map( (ingredient, index) => {
        ingredients.push(
            <li key={index}>{ingredient.text} - weight: {Math.round(ingredient.weight)}g</li>
        )
    })

    return (
        <div>
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