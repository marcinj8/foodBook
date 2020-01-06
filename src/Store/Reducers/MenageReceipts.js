import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  access: {
    apiKey: null,
    apiId: null,
  },
  receipts: [],
  reciptDetail: null,
  activeRecipe: null,
  favouritesRecipes: null,
  isFavouriteRecipesUpdatedOnApp: false,
  isRecipesUpdatedOnApp: false,
  dataBaseKey: '',
  savedReceipts: null,
  isMoreReceipts: false,
  error: {
    occurred: false,
    message: null,
  },
};

const setKey = (state, apiKey, apiId) => {
  console.log('access granted');
  return {
    ...state,
    access: {
      ...state.acces,
      apiKey: apiKey,
      apiId: apiId,
    },
  };
};

const compareRecipeList = (recipes, favouritesRecipes) => {
  const favouriteRecipesArr = Object.keys(favouritesRecipes);
  let recipesUpdated = [...recipes];
  if (recipes.length) {
    recipesUpdated.map((recipe, index) => { // zribic for
      for (let favouriteRecipeID of favouriteRecipesArr) {
        if (recipe.recipe.label === favouritesRecipes[favouriteRecipeID].recipe.label) {
          recipesUpdated[index] = { ...favouritesRecipes[favouriteRecipeID] }
        }
      }
    })
    console.log(recipesUpdated)

    return recipesUpdated;
  }
  return recipesUpdated;
}

const setRecipes = (state, recipes, isMoreRecipes) => {
  let recipesUpdated = [...recipes];
  if (state.favouritesRecipes !== null) {
    recipesUpdated = compareRecipeList([...recipes], state.favouritesRecipes);
  }
  console.log(recipes)
  return {
    ...state,
    receipts: [...recipesUpdated],
    isMoreReceipts: isMoreRecipes,
    isRecipesUpdatedOnApp: false,
  }
}

const resetRecipes = (state) => {
  return {
    ...state,
    receipts: []
  }
}
const setReciptDetail = (state, details, index) => {
  return {
    ...state,
    reciptDetail: { ...details },
    activeRecipe: index,
  };
};

const setFavouritesRecipes = (state, favRecipes) => {
  const favouriteRecipesUpdated = favRecipes === null ? {} : { ...favRecipes };
  let recipesUpdated = [...state.receipts];
  if (state.receipts !== null) {
    recipesUpdated = compareRecipeList(state.receipts, { ...favRecipes });
  }

  return {
    ...state,
    receipts: recipesUpdated,
    favouritesRecipes: { ...favouriteRecipesUpdated },
    isFavouriteRecipesUpdatedOnApp: true
  }
}

const updateFavouriteList = (state, newRecipe) => {
  // console.log('updateFavouriteList', newRecipe)
  // const newFavouritiesList = {...state.favouritesRecipes};
  // const temporaryKey = new Date().getTime();
  // console.log(temporaryKey)
  // newFavouritiesList[temporaryKey] = {...newRecipe};
  // const recipeList = compareRecipeList(
  //   state.receipts,
  //   newFavouritiesList
  // );
  return {
    ...state,
    // favouritesRecipes: newFavouritiesList,
    // receipts: recipeList,
    isFavouriteRecipesUpdatedOnApp: false,


    // reciptDetail: updatedRecipeDetail, czy to potrzebne?
  };
};

const deleteRecipeFromFavouriteList = (state, id) => {
  const updatedFavouritesReclipesList = { ...state.favouritesRecipes };
  delete updatedFavouritesReclipesList[id];
  
  return {
    ...state,
    favouritesRecipes: updatedFavouritesReclipesList,
    isRecipesUpdatedOnApp: false,
  };
}
const menageReceiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PREMISSION:
      return setKey(state, action.apiKey, action.apiId);
    case actionTypes.SET_RECEIPTS:
      return setRecipes(state, action.receipts, action.isMoreReceipts);
    case actionTypes.SEE_RECIPT_DETAIL:
      return setReciptDetail(state, action.details, action.index);
    case actionTypes.RESET_RECIPES:
      return resetRecipes(state);
    case actionTypes.SET_FAVOURITES:
      return setFavouritesRecipes(state, action.recipes, action.dataBaseKey);
    case actionTypes.UPDATE_FAVOURITIES:
      return updateFavouriteList(state, action.newRecipe);
    case actionTypes.DELETE_RECIPE_FROM_FAVOURITE_LIST:
      return deleteRecipeFromFavouriteList(state, action.id);
    default:
      return state;
  }
};

export default menageReceiptReducer;