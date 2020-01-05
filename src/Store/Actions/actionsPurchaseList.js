import * as actionTypes from './ActionTypes';
import Axios from 'axios';

export const removedFromPurchaseList = id => {
    return {
        type: actionTypes.REMOVE_FROM_PURCHASE_LIST,
        id: id
    }
}

export const removeFromPurchaseList = id => {
    console.log(id) // id to pusty string, sprawdzić czy można usunąć parametr?

    return dispatch => {
        Axios.delete('https://fooddatabase-75cfa.firebaseio.com/purchseList/' + id + '.json')
            .then(res => {
                console.log(res)
                return dispatch(removedFromPurchaseList(id))
            })
            .catch(err => alert(err))
    }
}

const removedMultipleItemsFromPurchaseList = () => {
    return {
        type: actionTypes.REMOVE_MULTIPLE_ITMES_FROM_PURCHASELIST
    }
}

const filterItemsToSaveOnServer = purchaseList => {
    const updatedPurchaseList = { ...purchaseList };
    const purchasedItemList = Object.keys(updatedPurchaseList).filter(key => {
        return updatedPurchaseList[key].purchased === true;
    })
    
    for (let value of purchasedItemList) {
        delete updatedPurchaseList[value];
    }

    return removeMultipleItemsOnServer(updatedPurchaseList);
}

const removeMultipleItemsOnServer = itemsToSave => {
    console.log(itemsToSave)
    return dispatch => {
        Axios.put('https://fooddatabase-75cfa.firebaseio.com/purchseList/.json', itemsToSave)
            .then(res => {
                console.log(res);
                return dispatch(removedMultipleItemsFromPurchaseList())
            })
            .catch(err => alert(err))
    }
}

export const removeMultipleItemsFromPurchaseList = (command, purchaseList) => {
    let itemToSave = '';
    if (command === 'purchased') {
        return filterItemsToSaveOnServer(purchaseList);
    }
    if (command === 'all') {
        return removeFromPurchaseList(itemToSave); // nie działa
    }
}

const addIngredientesToState = () => {
    return {
        type: actionTypes.ADD_TO_PURCHASE_LIST,
    }
}

export const addToPurchaseList = (ingredient, weight, quantity = null ) => {
    const item = {
        ingredient: quantity === null
        ? ingredient
        : quantity + ' of ' + ingredient,
        weight: weight,
        purchased: false
    }
    console.log('kurwa', ingredient, weight, quantity, item)

    console.log(item, 'pushed to server')
    return dispatch => {
        Axios.post('https://fooddatabase-75cfa.firebaseio.com/purchseList.json', item)
            .then(res => {
                console.log(res);
                return dispatch(addIngredientesToState())
            })
            .catch(err => alert(err))

    }
}

const setPurchaseList = data => {
    return {
        type: actionTypes.SET_PURCHASE_LIST,
        data: data,
    }
}

export const getPurchaseList = () => {
    return dispatch => {
        Axios.get('https://fooddatabase-75cfa.firebaseio.com/purchseList.json')
            .then(res => {
                return dispatch(setPurchaseList(res.data))
            })
            .catch(err => alert(err))

    }
}

export const tooglePurchasedProperty = id => {
    return {
        type: actionTypes.TOOGLE_PURCHASED_PROPERTY,
        id: id
    }
}

export const sendListOnServerSucces = () => {
    return {
        type: actionTypes.SEND_LIST_ON_SERVER,
    }
}

export const sendListOnServer = purchaseList => {
    return dispatch => {
        Axios.put('https://fooddatabase-75cfa.firebaseio.com/purchseList.json', purchaseList)
            .then(res => {
                console.log(res);
                return dispatch((sendListOnServerSucces()))
            })
            .catch(err => alert(err))
    }

}