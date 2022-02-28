import {useQuery, useQueryClient, useMutation} from 'react-query';
import {_custom, _get, _put, _post} from '@/modules/api';
import {useState} from "react";

//login bằng mạng xã hội
export const useSocialLogin = (params) => {
    const [value, setValue] = useState(null);
    const { status, data, error, refetch } = useQuery(['social_login', params], () => _post('admin-api/social/login',params),
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
