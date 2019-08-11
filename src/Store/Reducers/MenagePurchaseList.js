import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    purchaseList: {}
}

const addToPurchaseList = (state, ingredient, weight) => {
    return {
        ...state,
        [ingredient]: 
            {
                weight: weight,
                purchased: false
            }
    };
}

const removeFromPurchaseList = (state, data) => {
    console.log(data)
    return state
}


const menagePurchaseList = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PURCHASE_LIST: return addToPurchaseList(state, action.ingredient, action.weight);
        case actionTypes.REMOVE_FROM_PURCHASE_LIST: return removeFromPurchaseList(state, action.data);
        default: return state
    }
}

export default menagePurchaseList