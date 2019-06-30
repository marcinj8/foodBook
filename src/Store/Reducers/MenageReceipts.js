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
    dataBaseKey: '',
    savedReceipts: null,
    isMoreReceipts: false,
    error: {
        occurred: false,
        message: null
    }
}

const setKey = (state, apiKey, apiId) => {
    console.log(apiKey, apiId)
    return {
        ...state,
        access: {
            ...state.acces,
            apiKey: apiKey,
            apiId: apiId
        }
    }
}

const compareRecipeList = (state, newRecipes, favouriteList) => {
    const currentFavouriteList =  favouriteList || [...state.favouritesRecipes];
    const recipeListUpdated = [...newRecipes];
        recipeListUpdated.map( (value, index) => {
            for(let favouriteRecipe of currentFavouriteList) {
                if(favouriteRecipe.recipe.label === value.recipe.label) {
                    recipeListUpdated[index] = favouriteRecipe;
                };
            };
        });
    return recipeListUpdated
}

const setReceipts = (state, receipts, isMoreReceipts) => {
    const recipeList = compareRecipeList(state, receipts);
    return {
        ...state,
        receipts: recipeList,
        isMoreReceipts: isMoreReceipts
    };
}

const setReciptDetail = (state, details, index) => {
    const udpadeDetails = {...details};
    udpadeDetails.ID = index || null;
    console.log(udpadeDetails, index)
    return {
        ...state,
        reciptDetail: udpadeDetails,
        activeRecipe: index
    };
}

const setFavouritesRecipes = (state, recipes, dataBaseKey) => {
    // const favouritesRecipesList = [];
    // Object.keys(recipes).map( key => favouritesRecipesList.push({...recipes[key], ID: key}))
    return {
        ...state,
        favouritesRecipes: recipes,
        dataBaseKey: dataBaseKey
    };
}

const addToFavourites = (state, recipes) => {
    return {
        ...state,
        favouritesRecipes: recipes
    };
}

const updateRecipeDetail = (state, favouriteList) => {
    const updateRecipeDetail = {...state.reciptDetail};
    favouriteList.map( (recipe, index) => {
        if(recipe.recipe.label === state.reciptDetail.recipe.label) {
            updateRecipeDetail.bookmarked = true;
            updateRecipeDetail.ID = index;

        }
    });
    return updateRecipeDetail;
    
}

const updateRecipeList = (state, recipes) => {
    addToFavourites(state, recipes);
    const recipeList = compareRecipeList(state, state.receipts, recipes);
    const updatedRecipeDetail = updateRecipeDetail(state, recipes);
    return {
        ...state,
        receipts: recipeList,
        reciptDetail: updatedRecipeDetail

    };
}

const removeFromFavourite = (state, id) => {
    const updatedFavouriteList = [...state.favouritesRecipes];
    updatedFavouriteList.splice(id,1)
    console.log(updatedFavouriteList, id)
    return {
        ...state,
        favouritesRecipes: updatedFavouriteList
    }
}

const menageReceiptReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.GET_PREMISSION: return setKey(state, action.apiKey, action.apiId);
        case actionTypes.SET_RECEIPTS: return setReceipts(state, action.receipts, action.isMoreReceipts);
        case actionTypes.SEE_RECIPT_DETAIL: return setReciptDetail(state, action.details, action.index);
        case actionTypes.SET_FAVOURITES: return setFavouritesRecipes(state, action.recipes, action.dataBaseKey);
        case actionTypes.ADD_TO_FAVOURITIES: return updateRecipeList(state, action.recipes);
        case actionTypes.REMOVE_FROM_FAVOURITIES: return removeFromFavourite(state, action.id);
        default: return state;
    };
}

export default menageReceiptReducer;