import {useQuery, useQueryClient, useMutation} from 'react-query';
import {_custom, _delete, _post, _put} from '@/modules/api';
import {useState} from "react";
import {DialogBoxService} from "@/components";
//Xác minh OTP
export const useVerifyOtpLogin = (params) => {
    const [valueOTP, setValueOTP] = useState(null);
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['verify_otp_login', params], () => _post('admin-api/otp/login', params),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            onSuccess: data => {
                setValueOTP({...data?.body})
            },
            onError: error => {
                setValueOTP({});
            },
        });
    return {
        status, error, valueOTP, refetch, data
    }
}
//Gửi yêu cầu lấy otp khi đăng nhập bằng sđt
export const useRequestOtpLogin = (params) => {
    const [valueRequest, setValueRequest] = useState(null);
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['request_otp_login', params], () => _post('admin-api/otp/request', params),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            onSuccess: data => {
                console.log('222222',data)
                setValueRequest(data)
            },
            onError: error => {
                setValueRequest({});
            },
        });
    return {
        status, error, valueRequest, refetch
    }
}
//lien ket so dien thoai
export const useConnectNumberPhone = (params) => {
    const [valueOTP, setValueOTP] = useState(null);
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['connect_number_phone', params], () => _put('admin-api/otp/update', params),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            onSuccess: data => {
                setValueOTP({...data?.body})
            },
            onError: error => {
                setValueOTP({});
            },
        });
    return {
        status, error, valueOTP, refetch, data
    }
}
//huy lien ket sdt
export const useRemoveSocialLoginConfig = (params) => {
    const [value, setValue] = useState(null);
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['remove_social_login', params], () => _delete('admin-api/otp/remove?loginType=' + params.loginType),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            onSuccess: data => {
                setValue(data?.body)
            },
            onError: error => {
                setValue({});
            },
        });
    return {
        status, error, value, refetch
    }
}
//lien ket sdt ngoai 087
export const useNumberPhoneLoginConfig = (params) => {
    const [value, setValue] = useState(null);
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery(['connect_non_itel_login'], () => _post('admin-api/otp/requestUpdate', params),
        {
            enabled: false,
            onSuccess: data => {
                setValue(data?.body ? data?.body : data)
            },
            onError: error => {
                setValue({});
            },
        });
    return {
        status, error, value, refetch, data, remove
    }
}

//login 3g4
export const useLoginLTE = (params) => {
    const [value, setValue] = useState(null);
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery(['login_lte'], () => _custom('admin-api/itgg/login?deviceToken=' + params.deviceToken,'','POST','http://app.itel.vn/uat/'),
        {
            enabled: false,
            onSuccess: data => {
                if (data.code === "APP001") {
                    DialogBoxService.alert("Phương thức đăng nhập không hợp lệ. Vui lòng thử lại")
                } else {
                    setValue(data?.body)
                }
            },
            onError: error => {
                setValue({});
            },
        });
    return {
        status, error, value, refetch, data, remove
    }
}
