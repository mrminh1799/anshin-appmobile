export const TYPES = {
    GLOBAL_RESET: 'GLOBAL_RESET',
    BEGIN_API_REQUEST: 'BEGIN_API_REQUEST',
    CLEAR_API_CALL_ERROR: 'CLEAR_API_CALL_ERROR',
    API_CALL_ERROR: 'API_CALL_ERROR',
};

export const globalReset = () => ({
    type: TYPES.GLOBAL_RESET,
    payload: null,
});
export const beginCallApi = (url, param) => ({type: TYPES.BEGIN_API_REQUEST, payload: {url, param}});
export const endCallApi = (key, data) => dispatch => {
    dispatch(({type: key + "_SUCCESS", payload: data}))
    return Promise.resolve()
};
export const apiCallErrorAction = (error) => ({type: TYPES.API_CALL_ERROR, error});
export const clearApiCallError = () => ({type: TYPES.CLEAR_API_CALL_ERROR});

