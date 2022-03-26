export const TYPES = {
    BEGIN_API_REQUEST: 'BEGIN_API_REQUEST',
    CLEAR_API_CALL_ERROR: 'CLEAR_API_CALL_ERROR',
    API_CALL_ERROR: 'API_CALL_ERROR',
};


export const beginCallApi = (url, param) => ({type: TYPES.BEGIN_API_REQUEST, payload: {url, param}});
export const endCallApi = (key, data) => dispatch => {
    dispatch(({type: key + "_SUCCESS", payload: data}))
    return Promise.resolve()
};
export const apiCallErrorAction = (error) => ({type: TYPES.API_CALL_ERROR, error});