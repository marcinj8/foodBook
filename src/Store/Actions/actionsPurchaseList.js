import * as actionTypes from './ActionTypes';
import Axios from 'axios';

export const removedFromPurchaseList = id => {
    return {
        type: actionTypes.REMOVE_FROM_PURCHASE_LIST,
        id: id
    }
}

export const removeFromPurchaseList = id => {
    console.log(id)

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
    const arrayKeys = Object.keys(updatedPurchaseList).filter(key => {
        return updatedPurchaseList[key].purchased === true;
    })

    for (let value of arrayKeys) {
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
    const itemToSave = null;
    if (command === 'purchased') {
        return filterItemsToSaveOnServer(purchaseList);
    }
    if (command === 'all') {
        return removeMultipleItemsOnServer(itemToSave); // nie działa
    }
}

const addIngredientesToState = () => {
    return {
        type: actionTypes.ADD_TO_PURCHASE_LIST,
    }
}

export const addToPurchaseList = (currentIngredientList, ingredient, weight) => {
    const item = {
        ingredient: ingredient,
        weight: weight,
        purchased: false
    }

    console.log(item, 'pushed to server')
    return dispatch => {
        Axios.post('https://fooddatabase-75cfa.firebaseio.com/purchseList.json', item)
            .then(res => {
                console.log(res);
                return dispatch(addIngredientesToState(item))
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
                console.log(res);
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















// export const addToPurchaseList = (purchaseList, ingredient, weight) => {
//     pushPurchaseItemToServer(ingredient, weight);
//     // rozpozawanie składników do opracownia
//     // const currentPurchaseList = { ...purchaseList };
//     // // debugger
//     // return dispatch => {
//     //     if (currentPurchaseList === {} ) {
//     //         console.log('dsafsadf')
//     //         return dispatch(pushPurchaseItemToServer(ingredient, weight))
//     //     }
//     //     Object.keys(currentPurchaseList).map(stateIngredient => {
//     //         if (stateIngredient === ingredient) {
//     //             console.log(stateIngredient);
//     //             return dispatch(pushPurchaseItemToServer(ingredient, weight))
//     //         } else if (stateIngredient !== ingredient) {
//     //             return dispatch(pushPurchaseItemToServer(ingredient, weight))
//     //         }
//     //     })
//     // }
// }