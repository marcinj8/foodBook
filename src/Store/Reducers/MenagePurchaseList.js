import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    purchaseList: null,
    isStateListUpdated: false,
    isServerListUpdated: true
}

const setPurchaseList = (state, data) => {
    const purchaseList = {};
    if (data === null) {
        return state
    }
    Object.keys(data).map(key => {
        purchaseList[key] = {
            ingredient: data[key].ingredient,
            purchased: data[key].purchased,
            weight: data[key].weight
        }
        return purchaseList
    })
    return {
        ...state,
        purchaseList: purchaseList,
        isStateListUpdated: true,
        isServerListUpdated: true
    }
}

const addToPurchaseList = (state) => {
    return {
        ...state,
        isStateListUpdated: false,
        isServerListUpdated: true
    };
}

const sendListOnServer = state => {// dodac do reducera
    return {
        ...state,
        isStateListUpdated: false,
        isServerListUpdated: true
    }
}

const removeFromPurchaseList = (state, id) => {
    let updatedPurchaseList = { ...state.purchaseList };
    if (id !== '') {
        delete updatedPurchaseList[id];
    } else if( id === ''){
        updatedPurchaseList = null
    }
    return {
        ...state,
        purchaseList: updatedPurchaseList,
        isStateListUpdated: true,
        isServerListUpdated: true
    }
}

const removeMultipleItemsFromPurchaseList = (state) => {
    console.log('delete multiple')
    return {
        ...state,
        isStateListUpdated: false,
        isServerListUpdated: true
    };
}

const tooglePurchasedProperty = (state, id) => {
    const updatedPurchaseList = { ...state.purchaseList };
    updatedPurchaseList[id].purchased = !updatedPurchaseList[id].purchased;

    return {
        ...state,
        purchaseList: updatedPurchaseList,
        isServerListUpdated: false
    };
}


const menagePurchaseList = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PURCHASE_LIST: return setPurchaseList(state, action.data, action.isStateListUpdated);
        case actionTypes.SEND_LIST_ON_SERVER: return sendListOnServer(state);
        case actionTypes.ADD_TO_PURCHASE_LIST: return addToPurchaseList(state, action.isStateListUpdated);
        case actionTypes.REMOVE_FROM_PURCHASE_LIST: return removeFromPurchaseList(state, action.id);
        case actionTypes.REMOVE_MULTIPLE_ITMES_FROM_PURCHASELIST: return removeMultipleItemsFromPurchaseList(state);
        case actionTypes.TOOGLE_PURCHASED_PROPERTY: return tooglePurchasedProperty(state, action.id)
        default: return state
    }
}

export default menagePurchaseList