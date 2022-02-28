export const TYPES = {
    SET_PAYMENT: 'SET_PAYMENT',
    RESET_PAYMENT: 'RESET_PAYMENT'
};

export const SetPaymentInfo = (payload) => ({ type: TYPES.SET_PAYMENT, payload: payload });
export const ResetPayment = () => ({ type: TYPES.RESET_PAYMENT });