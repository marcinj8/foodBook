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
    console.log(res)
    return {
        type: actionTypes.SET_RECEIPTS,
        receipts: res.hits,
        isMoreReceipts: res.more
    }
}

export const setReceipts = (ingredient, apiId, apiKey, searchFrom, searchTo) => {
    return dispatch => {
        Axios.get(`https://api.edamam.com/search?q=${ingredient}&app_id=${apiId}&app_key=${apiKey}&from=${searchFrom}&to=${searchTo}`)
            .then(res => dispatch(storeRecipes(res.data)))
    }
};

export const resetRecipesState = () => {
    return {
        type: actionTypes.RESET_RECIPES,
    }
}

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

const storeFavourites = (recipes) => {
    return {
        type: actionTypes.SET_FAVOURITES,
        recipes: recipes,
    }
};

export const setFavourites = () => {
    return dispatch => {
        Axios.get(CORS + 'https://fooddatabase-75cfa.firebaseio.com/favouritesList.json')
            .then(res => {
                dispatch(storeFavourites(res.data))
            })
    }
};
const updateFavouriteList = newRecipe => {
    return {
        type: actionTypes.UPDATE_FAVOURITIES,
        newRecipe: newRecipe
    }
};

export const pushUpdatedFavouriteList = (newRecipe) => {
    newRecipe.bookmarked = true;
    console.log(newRecipe, 'pushed to server')
    return dispatch => {
        Axios.post('https://fooddatabase-75cfa.firebaseio.com/favouritesList/.json', newRecipe)
            .then(res => {
                console.log(res)
                return dispatch(updateFavouriteList(newRecipe))
            })
            .catch(err => console.log(err))
    }
};

const deleteRecipeFromFavourites = id => {
    return {
        type: actionTypes.DELETE_RECIPE_FROM_FAVOURITE_LIST,
        id: id
    }
}

export const removeFromFavourities = (id) => {
    console.log(id)
    return dispatch => {
        Axios.delete('https://fooddatabase-75cfa.firebaseio.com/favouritesList/' + id + '.json')
            .then(res => {
                console.log(res)
                return dispatch(deleteRecipeFromFavourites(id))
            })
    }
}