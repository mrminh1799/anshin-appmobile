export const TYPES = {
    VNPayment: 'VNPayment',
    VNPayClear: 'VNPayClear'
};

export const SendNotiVNPay = (payload) => ({ type: TYPES.VNPayment, payload: payload });
export const ClearVnPay = () => ({ type: TYPES.VNPayClear });
