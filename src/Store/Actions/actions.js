import * as actionTypes from './ActionTypes';
import Axios from 'axios';

const CORS = 'https://cors-anywhere.herokuapp.com/';


export const setPremissions = data => {
    return {
        type: actionTypes.GET_PREMISSION,
        apiKey: data.apiKey,
        apiId: data.user
    }
};

const storeRecipes = res => {
    return {
        type: actionTypes.SET_RECEIPTS,
        receipts: res.hits,
        isMoreReceipts: res.more
    }
}

export const setReceipts = (ingredient, apiId, apiKey, searchFrom, searchTo) => {
    return dispatch => {
        Axios.get(`https://api.edamam.com/search?q=${ingredient}&app_id=${apiId}&app_key=${apiKey}&from=${searchFrom}&to=${searchTo}`)
        .then( res => dispatch(storeRecipes(res.data)))
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

const storeFavourites = (recipes, dataBaseKey) => {
    return {
        type: actionTypes.SET_FAVOURITES,
        recipes: recipes,
        dataBaseKey: dataBaseKey
    }
};

export const setFavourites = () => {
    return dispatch => {
        Axios.get(CORS+'https://fooddatabase-75cfa.firebaseio.com/favouritesList.json')
        .then(res => {
            dispatch(storeFavourites(res.data))
        })
    }
};

const updateFavouriteList = recipes => {
    return {
        type: actionTypes.UPDATE_FAVOURITIES,
        recipes: recipes
    }
};

export const pushUpdatedFavouriteList = (updatedFavouriteList) => {
    console.log(updatedFavouriteList, 'fgfjkfj')
    return dispatch => {
        Axios.put('https://fooddatabase-75cfa.firebaseio.com/favouritesList/.json', updatedFavouriteList)
        .then(res => {
            console.log(res)
            return dispatch(updateFavouriteList(updatedFavouriteList))
        })
        .catch(err => console.log(err))
    }
};

