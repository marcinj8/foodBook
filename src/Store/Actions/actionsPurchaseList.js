import * as actionTypes from './ActionTypes';

export const addToPurchaseList = (ingredient, weight) => {
    return {
        type: actionTypes.ADD_PURCHASE_LIST,
        ingredient: ingredient,
        weight: weight
    }
}

export const removeFromPurchaseList = data => {
    return {
        type: actionTypes.REMOVE_FROM_PURCHASE_LIST,
        data: data
    }
}

const checkCurrentState = (state, ingredient, weight) => {
    const currentPurchaseList = { ...state.purchaseList };
    Object.keys(currentPurchaseList).map(stateIngredient => {
        if(stateIngredient === ingredient) {

        } else {

        }
        
        console.log(ingredient)
    })
}