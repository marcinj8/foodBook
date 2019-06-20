import * as actionTypes from './ActionTypes';

export const setPremissions = data => {
    return {
        type: actionTypes.GET_PREMISSION,
        apiKey: data.apiKey,
        apiId: data.user
    }
};

export const setReceipts = data => {
    return {
        type: actionTypes.SET_RECEIPTS,
        receipts: data.hits,
        isMoreReceipts: data.more
    }
};

export const errorHandler = error => {
    return {
        type: actionTypes.ERROR_HANDLER,
        occured: true,
        message: error.message || 'something went wrong',
    }
};

export const seeReciptDetail = (details, index) => {
    return {
        type: actionTypes.SEE_RECIPT_DETAIL,
        details: details,
        index: index
    }
};

export const setFavourites = recipes => {
    return {
        type: actionTypes.SET_FAVOURITES,
        recipes: recipes
    }
};

export const addToFavourites = recipe => {
    return {
        type: actionTypes.ADD_TO_FAVOURITIES,
        recipe: recipe
    }
};