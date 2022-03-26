import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import errorReducer from './common/reducers/ErrorReducer';
import statusReducer from './common/reducers/StatusReducer';
import globalReducer from './common/reducers/GlobalReducer';
import apiCallReducer from './common/reducers/ApiCallReducer';

const logger = createLogger();
export const rootReducer = combineReducers({
    globalReducer,
    errorReducer,
    statusReducer,
    apiCallReducer,
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger),
);
