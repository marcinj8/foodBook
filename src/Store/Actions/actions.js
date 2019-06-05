import * as actionTypes from './ActionTypes';

export const setPremissions = data => {
    return {
        type: actionTypes.GET_PREMISSION,
        apiKey: data.apiKey,
        apiId: data.user
    }
};

export const serReceipts = data => {
    return {
        type: actionTypes.SET_RECEIPTS,
        receipts: data.hits,
        isMoreReceipts: data.more
    }
}

export const errorHandler = error => {
    return {
        type: actionTypes.ERROR_HANDLER,
        occured: true,
        message: error.message || 'something went wrong',
    }
}

export const seeReciptDetail = details => {
    return {
        type: actionTypes.SEE_RECIPT_DETAIL,
        details: details
    }
}