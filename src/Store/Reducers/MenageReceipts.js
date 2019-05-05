import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    access: {
        apiKey: '',
        apiId: ''
    },
    receipts: {},
    savedReceipts: {}
}

const menageReceiptReducer = ( state = initialState, action ) => {
    switch (action.type) {
        default: return state
    }
}

export default menageReceiptReducer;