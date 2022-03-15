import {useQuery} from "react-query";
import {_get} from "../component/callAPI";

//chitiet sp
    export const useGetAllOrder = (params) => {
        const {
            status,
            data,
            error,
            refetch
        } = useQuery(['get_order', params], () => _get('admin/order/findAll'));
        return {
            status, error, data, refetch
        }
    }