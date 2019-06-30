import React from 'react';

import './RecipeDetail.css';
import { removeFromFavourite } from '../../Store/Actions/actions';

const recipeDetail = props => {
    if(props.reciptDetail === null) {
        return null
    }
    console.log(props.ID)
    const ingredients = [];
    props.reciptDetail.ingredients.map( (ingredient, index) => ingredients.push(
            <li key={index}>{ingredient.text} ( {Math.round(ingredient.weight)}g )</li>
        )
    )

    return (
        <div className='recipeDetail__block'>
            <h3>{props.reciptDetail.label}</h3>
            <div>
                <h4>Ingredients:</h4>
                <ul style={{'textAlign':'left'}}>
                    {ingredients}
                </ul>
            </div>
            {
                props.isBookmarked
                ?<button onClick={ () => props.removeFromFavourite(props.ID)}>Remove from favourite</button>
                :<button onClick={props.addToFavourites}>Add to favourite</button>
            }
        </div>
    )
}

export default recipeDetail;