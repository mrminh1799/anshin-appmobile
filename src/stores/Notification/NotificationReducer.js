import { TYPES } from './NotificationAction';
import _ from 'lodash';

const initialState = {
    VNPayNoti: null
}


export default (state = initialState, action) => {

    switch (action.type) {
        case TYPES.VNPayment:
            let temp = _.cloneDeep(action.payload);
            const body = JSON.parse(temp.data.body);
            // console.log("Body received ------------> " + JSON.stringify(body));
            // console.log("TopUpHis --------------->" + JSON.stringify(body.topupHis));
            // console.log("DataTopup ------------------------>" + body.topupData);
            let VNPayment = {
                debtStatus: body.topupHis.debtStatus,//trang thai thanh toan(1 = success, 2= fail)
                debtReqId: body.topupHis.debtReqId,
                debtDesc: body.topupHis.debtDesc,// msg mà dms trả về sau khi mua dịch vụ
                paymentData: body.topupData ? JSON.parse(body.topupData) : JSON.parse(body.prepaidData),//data VNPay tra ve
                message: body.message,
                sentTime: temp.sentTime
            }
            return { ...state, VNPayNoti: VNPayment }
        case TYPES.VNPayClear:
            return { ...state, VNPayNoti: null }
        default:
            return state
    }
}