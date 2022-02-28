import {useQuery} from "react-query";
import {_get, _post} from "@/modules/api";
import {COMMON} from "@/constants";

//lay mã tỉnh thàhh
export const useGetCityCode = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_city_code', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'pps/issuedPlace', params));
    return {
        status, error, data, refetch
    }
}

//show phieu dangky
export const useGetShowFile = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery('get_show_file', () => _post(COMMON.SUFFIX_API.INTEGRATION + 'pps/declaration', params), {enabled: false});
    return {
        status, error, data, refetch, remove
    }
}

//kiem tra 3sdt
export const useGetCheckThreePhoneNumber = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery('get_checK_three_phone_number', () => _get(COMMON.SUFFIX_API.INTEGRATION + 'pps/checkThreePhone?idNumber=' + params.idNumber), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//lay otp
export const useGetOTP = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery('get_otp', () => _post(COMMON.SUFFIX_API.INTEGRATION + 'pps/otpUpdateInfoPhone', params), {enabled: false});
    return {
        status, error, data, refetch, remove
    }
}
//lay otp
export const useGetUpdateSubcriber = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery('get_update_subscriber', () => _post(COMMON.SUFFIX_API.INTEGRATION + 'pps/addPpsInfo', params),{enabled: false});
    return {
        status, error, data, refetch, remove
    }
}
//check 20tb
export const useCheck20Subscriber = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery('get_check_20subscriber', () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/check-id-number', params),{enabled: false});
    return {
        status, error, data, refetch, remove
    }
}
