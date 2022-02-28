import {TYPES} from '../actions/GlobalActions';

const initialState = {
    apiCallsInProgress: 0,
    apiCallError: null,
    info: {},
};


const errorReducer = (state = initialState, action) => {
    const matchesStart = /(.*)_(REQUEST)/.exec(action.type);
    const matchesSuccess = /(.*)_(SUCCESS)/.exec(action.type);
    const matchesError = /(.*)_(ERROR)/.exec(action.type);


    if (matchesStart) {
        return {...state, apiCallsInProgress: state.apiCallsInProgress + 1, info: action.payload};
    } else if (matchesSuccess) {
        if (state.apiCallsInProgress === 0) {
            return state;
        }
        return {...state, apiCallsInProgress: state.apiCallsInProgress - 1};
    } else if (matchesError) {
        return {...state, apiCallsInProgress: state.apiCallsInProgress - 1, apiCallError: action.error};
    } else if (action.type === TYPES.CLEAR_API_CALL_ERROR) {
        if (state.apiCallError === null) {
            return state;
        }
        return {...state, apiCallError: null};
    }
    return state;
};

export default errorReducer;
