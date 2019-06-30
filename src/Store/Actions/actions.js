import * as actionTypes from './ActionTypes';
import { identifier } from '@babel/types';

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

export const setFavourites = (recipes, dataBaseKey) => {
    return {
        type: actionTypes.SET_FAVOURITES,
        recipes: recipes,
        dataBaseKey: dataBaseKey
    }
};

export const addToFavourites = recipes => {
    return {
        type: actionTypes.ADD_TO_FAVOURITIES,
        recipes: recipes
    }
};

export const removeFromFavourite = id => {
    return {
        type: actionTypes.REMOVE_FROM_FAVOURITIES,
        id: id
    };
}