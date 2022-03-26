import {useQuery} from "react-query";
import {_get, _post} from "../component/callAPI";
import {createGet} from "./utils";

//chitiet sp
    export const useGetAllOrder = (params) => {
        const {
            status,
            data,
            error,
            refetch
        } = useQuery(['get_order', params], () => _get('admin/order/findAll'),{enabled:false});
        return {
            status, error, data, refetch
        }
    }
    export const useGetAllOrderById = (params) => {
        const {
            status,
            data,
            error,
            refetch
        } = useQuery(['get_order_by_id', params], () => _get('admin/order/findByStatus/'+ params.id),{
            enabled: false
        });
        return {
            status, error, data, refetch
        }
    }

export const getDetailOrder = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'detail_order','Order/findListOrderDetailForOrderId/'+params.orderId,{}, _callback);
}

export const changeStatus = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'change_status','Order/updateStatus/'+ params.id + "/" + params.status,{}, _callback);
}

export const deleteOrderDetail = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'delete_order_detail','Order/deleteOrderDetailById/'+ params.orderDetailId ,{}, _callback);
}

export const changeQuantityDetailOrder = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'change_quantity_detail_order','http://localhost:8080/Order/updateQuanityForOrderDetail/'+ params.orderDetailId + '/' + params.quantity ,{}, _callback);
}