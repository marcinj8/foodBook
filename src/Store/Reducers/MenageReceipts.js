import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    access: {
        apiKey: null,
        apiId: null
    },
    receipts: null,
    reciptDetail: null,
    savedReceipts: {},
    isMoreReceipts: false,
    error: {
        occurred: false,
        message: null
    }
}

const setKey = (state, apiKey, apiId) => {
    console.log(state, apiKey, apiId);
    return {
        ...state,
        access: {
            apiKey: apiKey,
            apiId: apiId
        }
    }
}

const setReceipts = (state, receipts, isMoreReceipts) => {
    console.log(receipts);
    return {
        ...state,
        receipts: receipts,
        isMoreReceipts: isMoreReceipts
    }
}

const setReciptDetail = (state, details) => {
    console.log(details);
    return {
        ...state,
        reciptDetail: details
    }
}

const menageReceiptReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.GET_PREMISSION: return setKey(state, action.apiKey, action.apiId);
        case actionTypes.SET_RECEIPTS: return setReceipts(state, action.receipts, action.isMoreReceipts);
        case actionTypes.SEE_RECIPT_DETAIL: return setReciptDetail(state, action.details)
        default: return state;
    }
}

export default menageReceiptReducer;