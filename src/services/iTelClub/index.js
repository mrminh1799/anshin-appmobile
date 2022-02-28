import {useQuery} from "react-query";
import {_get, _post} from "@/modules/api";
import {COMMON} from "@/constants";

//lay lay ra danh muc filter
export const useGetCatergory = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_category', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/loyalty/getVouchersCategory', params));
    return {
        status, error, data, refetch
    }
}

//lay mã tỉnh thàhh
export const useGetCity = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_city', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/loyalty/getCities', params));
    return {
        status, error, data, refetch
    }
}

//lay ra thong tin khach hang itelclub
export const useGetInfoCustomerLoyalty = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_info_customer_loyalty', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/loyalty/getCustomerInfo', params));
    return {
        status, error, data, refetch
    }
}

//lay ra uu dai da nhan
export const useGetReceivedPromotion = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_received_promotion', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/loyalty/getVouchersExchange', params));
    return {
        status, error, data, refetch
    }
}

//lay ra chi tiet uu dai da nhan
export const useGetVoucherDetail = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_detail_voucher', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/loyalty/getVouchersExchangeDetail', params));
    return {
        status, error, data, refetch
    }
}
