import {useQuery} from "react-query";
import {_get, _post} from "../component/callAPI";
import {createGet, createPost, createPut} from "./utils";

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
    await createGet(dispatch, 'change_quantity_detail_order','Order/updateQuanityForOrderDetail/'+ params.orderDetailId + '/' + params.quantity ,{}, _callback);
}

export const getAllProduct = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'all_product','product/findAll' ,{}, _callback);
}

export const getProductSize = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'product_size','size/findByProductId/' + params.id ,{}, _callback);
}

export const getProductColor = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'product_color','color/findByProductId/' + params.id ,{}, _callback);
}

export const getProductDetail = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'product_detail','product/findById/' + params.id ,{}, _callback);
}

export const changeOrder = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'change_order','Order/createOrderDetail',params, _callback);
}

export const changeReturn = (params, _callback) => async dispatch => {
    await createPut(dispatch, 'change_return','Order/changeReturn/' + params.id ,params, _callback);
}