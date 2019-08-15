import * as actionTypes from './ActionTypes';

const addIngredientToState = (ingredient, weight) => {
    return {
        type: actionTypes.ADD_PURCHASE_LIST,
        ingredient: ingredient,
        weight: weight
    }
}

const addToIngredient = (ingredient, weight) => { // poprawić zgodnie z przeznaczeniem
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

export const addToPurchaseList = (purchaseList, ingredient, weight) => { // przekazać aktualny state !
    console.log(purchaseList, ingredient, weight)
    // const currentPurchaseList = { ...purchaseList };
    // Object.keys(currentPurchaseList).map(stateIngredient => {
    //     if (stateIngredient === ingredient) {
    //         return addToIngredient(ingredient, weight)
    //     } else {
    //         return addIngredientToState(ingredient, weight)
    //     }
    // })

    
    return {
        type: actionTypes.ADD_PURCHASE_LIST,
        ingredient: ingredient,
        weight: weight
    }
}