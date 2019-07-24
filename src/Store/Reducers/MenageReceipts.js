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
  console.log (apiKey, apiId);
  return {
    ...state,
    access: {
      ...state.acces,
      apiKey: apiKey,
      apiId: apiId,
    },
  };
};

const compareRecipeList = (state, newRecipes, favouriteList) => {
  // console.log(state.favouritesRecipes)
  const currentFavouriteList = favouriteList;
  const recipeListUpdated = [...newRecipes];
  recipeListUpdated.map ((value, index) => {
    for (let favouriteRecipe of currentFavouriteList) {
      if (favouriteRecipe.recipe.label === value.recipe.label) {
        recipeListUpdated[index] = favouriteRecipe;
        recipeListUpdated[index].ID = currentFavouriteList.findIndex (
          recipe => recipe === favouriteRecipe
        );
      }
    }
  });
  return recipeListUpdated;
};

const setReceipts = (state, recpes, isMoreReceipts) => {
  let recipeList = recpes;
  if (state.favouritesRecipes !== null) {
    recipeList = compareRecipeList (state, recpes, state.favouritesRecipes);
  }
  //dodanie indexu do listy przepisów
  return {
    ...state,
    receipts: recipeList,
    isMoreReceipts: isMoreReceipts,
  };
};

const setReciptDetail = (state, details, index) => {
  const udpadeDetails = {...details};
  // console.log(udpadeDetails, index)
  return {
    ...state,
    reciptDetail: udpadeDetails,
    activeRecipe: index,
  };
};

const setFavouritesRecipes = (state, recipes, dataBaseKey) => {
  console.log (recipes);
  const favouriteRecipes = recipes === null ? [] : [...recipes];

  // const favouritesRecipesList = [];
  // Object.keys(recipes).map( key => favouritesRecipesList.push({...recipes[key], ID: key}))
  return {
    ...state,
    favouritesRecipes: favouriteRecipes,
    dataBaseKey: dataBaseKey,
  };
};

// const addToFavourites = (state, recipes) => {
//     return {
//         ...state,
//         favouritesRecipes: recipes
//     };
// } to delete

const updateRecipeDetail = (state, favouriteList) => {
  const updateRecipeDetail = {...state.reciptDetail};
  favouriteList.map ((recipe, index) => {
    if (recipe.recipe.label === state.reciptDetail.recipe.label) {
      updateRecipeDetail.bookmarked = true;
      updateRecipeDetail.ID = index;
    }
  });
  return updateRecipeDetail;
};

const updateFavouriteList = (state, favouritesRecipes) => {
  // addToFavourites(state, favouritesRecipes); to delete
  const recipeList = compareRecipeList (
    state,
    state.receipts,
    favouritesRecipes
  );
  const updatedRecipeDetail = updateRecipeDetail (state, favouritesRecipes);
  return {
    ...state,
    favouritesRecipes: favouritesRecipes,
    receipts: recipeList,
    reciptDetail: updatedRecipeDetail,
  };
};

const menageReceiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PREMISSION:
      return setKey (state, action.apiKey, action.apiId);
    case actionTypes.SET_RECEIPTS:
      return setReceipts (state, action.receipts, action.isMoreReceipts);
    case actionTypes.SEE_RECIPT_DETAIL:
      return setReciptDetail (state, action.details, action.index);
    case actionTypes.SET_FAVOURITES:
      return setFavouritesRecipes (state, action.recipes, action.dataBaseKey);
    case actionTypes.UPDATE_FAVOURITIES:
      return updateFavouriteList (state, action.recipes);
    default:
      return state;
  }
};

export default menageReceiptReducer;
