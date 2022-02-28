//truy van thong tin tk thuebao
import {useQuery} from "react-query";
import {_post} from "@/modules/api";
import {COMMON} from "@/constants";

export const useGetGame = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_game', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/game/getAll', params));
    return {
        status, error, data, refetch
    }
}

export const useGetCustomerPoint = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_customer_point', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/game/getCustomerPoint', params));
    return {
        status, error, data, refetch
    }
}

export const useGetTopPoint = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_top_point', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/game/getTopPoint', params),{
        enabled: false
    });
    return {
        status, error, data, refetch
    }
}

export const useGetCustomerInfo = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_customer_info', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/loyalty/getCustomerInfo', params),{
        enabled: false
    });
    return {
        status, error, data, refetch
    }
}