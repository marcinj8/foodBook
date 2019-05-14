import * as actionTypes from './ActionTypes';

export const setPremissions = data => {
    return {
        type: actionTypes.GET_PREMISSION,
        apiKey: data.apiKey,
        apiId: data.user
    }
}