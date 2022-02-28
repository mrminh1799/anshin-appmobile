import {TYPES} from './LoginAction'

const initialState = {
    isAuth: false,
    userData:{}
}


export default (state = initialState, action) => {

    switch (action.type) {
        case TYPES.LOGIN :
            return {...state, isAuth: true, userData: action.payload}
        case TYPES.LOGOUT :
            return {...state, isAuth: false}
        default:
            return state
    }
}