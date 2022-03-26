import {TYPES} from '../actions/GlobalActions';


const defaultState = {
}

const globalReducer = (state = defaultState, {payload, type}) => {
    if (type === TYPES.GLOBAL_RESET) {
        return {...defaultState};
    }
    const matchesSuccess = /(.*)_(SUCCESS)/.exec(type);

    let key = null;

    if (matchesSuccess) {
        const [, requestName] = matchesSuccess;
        key = requestName;
    }

    if (key) {
        return {...state, [key]: payload};
    }

    return state;
};

export default globalReducer;
