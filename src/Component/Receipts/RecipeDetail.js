import React from 'react';

import './RecipeDetail.css';

const recipeDetail = props => {
    if (props.reciptDetail === null) {
        return null
    }
    console.log(props.reciptDetail)

    const ingredients = [];
    props.reciptDetail.ingredients.map((ingredient, index) => ingredients.push(
        <li className="recipeDetail__ingredient"
            onClick={() => props.addToPurchaseList(ingredient.text, ingredient.weight)}
            key={index}>{ingredient.text} ( {Math.round(ingredient.weight)}g )</li>
    ))

    const preparationTime = (
        props.reciptDetail.totalTime > 60
            ? props.reciptDetail.totalTime / 60 > 1
                ? Math.round(props.reciptDetail.totalTime / 60 * 100) / 100 + ' hours'
                : Math.round(props.reciptDetail.totalTime / 60 * 100) / 100 + ' hour'
            : Math.round(props.reciptDetail.totalTime) + 'minutes'
    );



    return (
        <div className='recipeDetail__block'>
            <h3>{props.reciptDetail.label}</h3>
            <div>
                <div className='recipeDetail__details'>
                    <span>Preparation time: {preparationTime}</span>
                </div>
                <h4>Ingredients:</h4>
                <ul style={{ 'textAlign': 'left' }}>
                    {ingredients}
                </ul>
                <a
                    className='receipeDetail__linkToRecipe'
                    href={props.reciptDetail.url}
                    target='blank'>see instructions on {props.reciptDetail.source} page</a>
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