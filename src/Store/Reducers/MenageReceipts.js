import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    access: {
        apiKey: null,
        apiId: null
    },
    receipts: [],
    reciptDetail: null,
    activeRecipe: null,
    favouritesRecipes: null,
    savedReceipts: null,
    isMoreReceipts: false,
    error: {
        occurred: false,
        message: null
    }
}

const setKey = (state, apiKey, apiId) => {
    console.log(state, apiKey, apiId);
    return {
        ...state,
        access: {
            apiKey: apiKey,
            apiId: apiId
        }
    }
}

const setReceipts = (state, receipts, isMoreReceipts) => {
    console.log(receipts);
    return {
        ...state,
        receipts: receipts,
        isMoreReceipts: isMoreReceipts
    }
}

const setReciptDetail = (state, details, index) => {
    console.log(details, index);
    return {
        ...state,
        reciptDetail: details,
        activeRecipe: index
    }
}

const setFavouritesRecipes = (state, recipes) => {
    return {
        ...state,
        favouritesRecipes: recipes
    }
}

const addToFavourites = (state, recipe) => {
    return {
        ...state,
        favouritesRecipes: {
            ...state.favouritesRecipes,
            recipe
        }
    }
}

const menageReceiptReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.GET_PREMISSION: return setKey(state, action.apiKey, action.apiId);
        case actionTypes.SET_RECEIPTS: return setReceipts(state, action.receipts, action.isMoreReceipts);
        case actionTypes.SEE_RECIPT_DETAIL: return setReciptDetail(state, action.details, action.index)
        case actionTypes.SET_FAVOURITES: return setFavouritesRecipes(state, action.recipes);
        case actionTypes.ADD_TO_FAVOURITIES: return addToFavourites(state, action.recipe);
        default: return state;
    }
}
console.log(initialState)

export default menageReceiptReducer;