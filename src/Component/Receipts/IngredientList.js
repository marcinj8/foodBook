import React from 'react';

import './IngredientList.css'

const ingredientList = props => {

    const ingredientList = [];
    const ingredients = props.reciptDetail.ingredients;
    let ingridientStyle = ['ingredientList'];
    let onClickFucntion = () => null;

    for (let item in ingredients) {
        for (let key in props.purchaseList) {
            if (props.purchaseList[key].ingredient === ingredients[item].text) {
                ingridientStyle[1] = 'ingredientList__choosenIngredient';
                onClickFucntion = () => null;
                break;
            } else if (props.purchaseList[key].ingredient !== ingredients[item].text) {
                ingridientStyle[1] = 'ingredientList__chooseIngredient';
                onClickFucntion = () => props.clicked(ingredients[item].text, ingredients[item].weight);
            }
            ingridientStyle = ['ingredientList', props.purchaseList[key].ingredient === ingredients[item].text
                ? 'ingredientList__choosenIngredient'
                : 'ingredientList__chooseIngredient'];
        }
        ingredientList.push(
            <li className={ingridientStyle.join(' ')}
                onClick={onClickFucntion}
                key={item}>{ingredients[item].text} ( {Math.round(ingredients[item].weight)}g )</li>
        )
    };

    return (
        <ul style={{ 'textAlign': 'left' }}>
            {ingredientList}
        </ul>
    )
};



export default ingredientList;