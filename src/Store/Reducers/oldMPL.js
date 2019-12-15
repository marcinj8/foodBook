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

const compareRecipeList = (recipes, favouriteList) => {
  const recipeListUpdated = [...recipes];
  const currentFavouriteList = [...favouriteList];
  recipeListUpdated.map((recipe, index) => {
    for (let favouriteRecipe of currentFavouriteList) {
      if (favouriteRecipe.recipe.label === recipe.recipe.label) {
        recipeListUpdated[index] = favouriteRecipe;
        recipeListUpdated[index].ID = currentFavouriteList.findIndex(
          recipe => recipe === favouriteRecipe
        );
      }
      return recipe;
    }
    return recipe;
  });
  return recipeListUpdated;
};

const setReceipts = (state, recipes, isMoreReceipts) => {
  let recipeList = [...recipes];
  if (state.favouritesRecipes !== null) {
    recipeList = compareRecipeList(recipes, state.favouritesRecipes);
  }
  return {
    ...state,
    receipts: recipeList,
    isMoreReceipts: isMoreReceipts,
  };
};

const setReciptDetail = (state, details, index) => {
  const updadeDetails = { ...details };
  return {
    ...state,
    reciptDetail: updadeDetails,
    activeRecipe: index,
  };
};

const setFavouritesRecipes = (state, recipes, dataBaseKey) => {
  const favouriteRecipes = recipes === null ? [] : [...recipes];

  // const favouritesRecipesList = [];
  // Object.keys(recipes).map( key => favouritesRecipesList.push({...recipes[key], ID: key}))
  return {
    ...state,
    favouritesRecipes: favouriteRecipes,
    dataBaseKey: dataBaseKey,
  };
};

const setFavouritesRecipeDetail = (recipeDetail, index) => {
  recipeDetail.bookmarked = true;
  recipeDetail.ID = index;
  return recipeDetail
}

const setUnFavouritesRecipeDetail = (recipeDetail) => {
  recipeDetail.bookmarked = false;
  delete updateRecipeDetail.ID;;
  return recipeDetail
}

const updateRecipeDetail = (state, favouriteList) => {
  const updateRecipeDetail = { ...state.reciptDetail };
  if (favouriteList.length === 0) {
     return setUnFavouritesRecipeDetail(updateRecipeDetail);
  }
  favouriteList.map((recipe, index) => {
    if (recipe.recipe.label === state.reciptDetail.recipe.label) {
      return setFavouritesRecipeDetail(updateRecipeDetail, index)
    } else if (recipe.recipe.label !== state.reciptDetail.recipe.label) {
      return setUnFavouritesRecipeDetail(updateRecipeDetail);
    }
    return updateRecipeDetail
  });
  return updateRecipeDetail;
};

const updateFavouriteList = (state, favouritesRecipes) => {
  const newFavouritiesList = [...favouritesRecipes];
  const recipeList = compareRecipeList(
    state.receipts,
    favouritesRecipes
  );
  const updatedRecipeDetail = updateRecipeDetail(state, favouritesRecipes);
  console.log(updatedRecipeDetail)
  return {
    ...state,
    favouritesRecipes: newFavouritiesList,
    receipts: recipeList,
    reciptDetail: updatedRecipeDetail,
  };
};

const menageReceiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PREMISSION:
      return setKey(state, action.apiKey, action.apiId);
    case actionTypes.SET_RECEIPTS:
      return setReceipts(state, action.receipts, action.isMoreReceipts);
    case actionTypes.SEE_RECIPT_DETAIL:
      return setReciptDetail(state, action.details, action.index);
    case actionTypes.SET_FAVOURITES:
      return setFavouritesRecipes(state, action.recipes, action.dataBaseKey);
    case actionTypes.UPDATE_FAVOURITIES:
      return updateFavouriteList(state, action.recipes);
    default:
      return state;
  }
};

export default menageReceiptReducer;