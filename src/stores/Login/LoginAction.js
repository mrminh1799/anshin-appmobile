export const TYPES = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

export const loginAction = (payload) => ({type: TYPES.LOGIN, payload: payload});
export const logoutAction = (payload) => ({type: TYPES.LOGOUT, payload: payload});
