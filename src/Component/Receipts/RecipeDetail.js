import React from 'react';

import './RecipeDetail.css';

const recipeDetail = props => {
    console.log(props.ID)
    if (props.reciptDetail === null) {
        return null
    }
    const ingredients = [];
    props.reciptDetail.ingredients.map((ingredient, index) => ingredients.push(
        <li className="recipeDetail__ingredient"
            onClick={() => props.addToPurchaseList(ingredient.text, ingredient.weight)}
            key={index}>{ingredient.text} ( {Math.round(ingredient.weight)}g )</li>
    ))

    return (
        <div className='recipeDetail__block'>
            <h3>{props.reciptDetail.label}</h3>
            <div>
                <h4>Ingredients:</h4>
                <ul style={{ 'textAlign': 'left' }}>
                    {ingredients}
                </ul>
            </div>
            {
                !props.isBookmarked
                    ? <button
                        className='recipeDetail__button'
                        onClick={props.addToFavourites}>Add to favourite</button>
                    : props.isFavouriteList
                        ? <button
                            className='recipeDetail__button'
                            onClick={() => props.removeFromFavourite(props.ID)}>Remove from favourite</button>
                        : <div className='recipeDetail_confirmation'>Added to favourite</div>
            }
        </div>
    )
}

export default recipeDetail;