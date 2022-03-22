import {useQuery} from "react-query";
import {_get, _post} from "../component/callAPI";

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
        } = useQuery(['get_order_by_id', params], () => _get('admin/order/findByStatus/'+ params.id));
        return {
            status, error, data, refetch
        }
    }