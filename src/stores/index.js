/*Import Library*/
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
/*Import Reducer*/
import globalReducer from '@/stores/global/reducer/GlobalReducer';
import errorReducer from '@/stores/global/reducer/ErrorReducer';
import login from '@/stores/Login/LoginReducer'
import NotificationReducer from './Notification/NotificationReducer';
import PaymentReducer from './Payment/PaymentReducer';
/*Create Store && Logger && Combine Reducer*/
const logger = createLogger();
export const rootReducer = combineReducers({
    errorReducer,
    globalReducer,
    login,
    NotificationReducer,
    PaymentReducer
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger),
);
