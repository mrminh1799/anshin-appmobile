import { TYPES } from './PaymentAction';
import _ from 'lodash';

const initialState = {
    price: null,// mệnh giá nạp thẻ
    phoneRecharge: null,// sđt dùng để nạp/ nạp cho
    service: null,//MT: mua thẻ hay NT: nạp tiền
    providerCode: null,//mã nhà cung cấp
    vendorCode: null,//mã nhà mạng
    product: null,//chi tiết gói nạp thẻ,
    quantity: null,//số lượng thẻ nạp
    email: null,// email nhậm mã thẻ
    resultCode: null,// code dùng để handle case thanh toán,
    paymentResult: null,
    method: null,
    reqId: null,
    txnRef: null,
    paymentLoading: false // hiển thị loading khi đang trong giao dịch 
}


export default (state = initialState, action) => {

    switch (action.type) {

        case TYPES.SET_PAYMENT: // update resultCode khi thanh toán
            return { ...state, ...action.payload }
        case TYPES.RESET_PAYMENT:
            return initialState
        default:
            return state
    }
}
