import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    access: {
        apiKey: null,
        apiId: null,
    },
    receipts: [],
    reciptDetail: null,
    activeRecipe: null,
    favouritesRecipes: [],
    dataBaseKey: '',
    savedReceipts: null,
    isMoreReceipts: false,
    error: {
        occurred: false,
        message: null,
    },
};

const setKey = (state, apiKey, apiId) => {
    console.log(apiKey, apiId);
    return {
        ...state,
        access: {
            ...state.acces,
            apiKey: apiKey,
            apiId: apiId,
        },
    };
};

const setRecipes = (state, recipes, isMoreRecipes) => {
    if (state.favouritesRecipes !== null) {
        console.log('porównac recipes i favRecipes')
    }
    return {
        ...state,
        receipts: [...recipes],
        isMoreReceipts: isMoreRecipes
    }
}

const setReciptDetail = (state, details, index) => {
    return {
        ...state,
        reciptDetail: { ...details },
        activeRecipe: index,
    };
};

const setFavouritesRecipes = (state, recipes ) => {
  const favouriteRecipesUpdated = recipes === null ? [] : [...recipes];

    return {
        ...state,
        favouritesRecipes: [...favouriteRecipesUpdated],
    }
}

const setFavouritesRecipeDetail = (recipeDetail) => {
    recipeDetail.bookmarked = true;
    return recipeDetail
  }
  
  const setUnFavouritesRecipeDetail = (recipeDetail) => {
    recipeDetail.bookmarked = false;
    return recipeDetail
  }

const updateRecipeDetail = (state, favouriteList) => { // dalej
    const updateRecipeDetail = { ...state.reciptDetail };
    if (favouriteList.length === 0) {
       return setUnFavouritesRecipeDetail(updateRecipeDetail);
    }
    favouriteList.map((recipe) => {
      if (recipe.recipe.label === state.reciptDetail.recipe.label) {
        return setFavouritesRecipeDetail(updateRecipeDetail)
      } else if (recipe.recipe.label !== state.reciptDetail.recipe.label) {
        return setUnFavouritesRecipeDetail(updateRecipeDetail);
      }
      return updateRecipeDetail
    });
    return updateRecipeDetail;
  };

const updateFavouriteList = (state, newRecipe) => {
    const newFavouritiesList = [...state.favouritesRecipes];
    newFavouritiesList.push(newRecipe);
    // const recipeList = compareRecipeList(
    //   state.receipts,
    //   favouritesRecipes
    // );
    const updatedRecipeDetail = updateRecipeDetail(state, newFavouritiesList);
    console.log(updatedRecipeDetail)
    return {
      ...state,
      favouritesRecipes: newFavouritiesList,
    //   receipts: recipeList,
      reciptDetail: updatedRecipeDetail,
    };
  };

const menageReceiptReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PREMISSION:
            return setKey(state, action.apiKey, action.apiId);
        case actionTypes.SET_RECEIPTS:
            return setRecipes(state, action.receipts, action.isMoreReceipts);
        case actionTypes.SEE_RECIPT_DETAIL:
            return setReciptDetail(state, action.details, action.index);
          case actionTypes.SET_FAVOURITES:
            return setFavouritesRecipes(state, action.recipes, action.dataBaseKey);
          case actionTypes.UPDATE_FAVOURITIES:
            return updateFavouriteList(state, action.newRecipe);
        default:
            return state;
    }
};

//   export default menageReceiptReducer;