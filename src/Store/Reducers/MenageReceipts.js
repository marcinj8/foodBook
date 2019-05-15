import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    access: {
        apiKey: null,
        apiId: null    
    },
    receipts: {},
    savedReceipts: {},
    error: {
        occurred: false,
        message: null
    }
}

const setKey = (state, apiKey, apiId) => {
    return {
        ...state,
        access: {
            apiKey: apiKey,
            apiId: apiId
        }
    }
}

const menageReceiptReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.GET_PREMISSION: return setKey(state, action.apiKey, action.apiId)
        default: return state
    }
}

export default menageReceiptReducer;