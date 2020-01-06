import React from 'react';

import './RecipeDetail.css';
import IngredientList from './IngredientList';

const recipeDetail = props => {
    if (props.reciptDetail === null) {
        return null
    }
    const preparationTime = (
        props.reciptDetail.totalTime > 60
            ? props.reciptDetail.totalTime / 60 > 1
                ? Math.round(props.reciptDetail.totalTime / 60 * 100) / 100 + ' hours'
                : Math.round(props.reciptDetail.totalTime / 60 * 100) / 100 + ' hour'
            : props.reciptDetail.totalTime < 10
                ? 'up to 15 minutes'
                : Math.round(props.reciptDetail.totalTime) + 'minutes'
    );
    // console.log(props.reciptDetail.totalWeight)
    // console.log(props.reciptDetail.totalNutrients.PROCNT.quantity)
    // console.log(props.reciptDetail.totalNutrients.PROCNT.quantity / props.reciptDetail.totalWeight * 100 + ' proteins')
    // console.log(props.reciptDetail.totalNutrients.FAT.quantity / props.reciptDetail.totalWeight * 100 + ' fat')


    return (
        <div className='recipeDetail__block'>
            <h2>{props.reciptDetail.label}</h2>
            <div>
                <h4>Ingredients:</h4>
                <IngredientList
                    purchaseList={props.purchaseList}
                    reciptDetail={props.reciptDetail}
                    clicked={props.addToPurchaseList} />

                <ul className='recipeDetail__details'>
                    <ul><b>Preparation time:</b> {preparationTime}</ul>
                    <ul><b>YIELD:</b> Makes {props.reciptDetail.yield} servings</ul>
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
                            onClick={() => props.removeFromFavourite(props.ID)}>Remove from favourite </button>
                        : <div className='recipeDetail_confirmation'>Added to favourite</div>
            }
        </div>
    )
}

export default recipeDetail;