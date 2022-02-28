import {useQuery, useQueryClient, useMutation} from 'react-query';
import {_custom, _get, _put, _post} from '@/modules/api';
import {useState} from "react";


//Guest Login
export const useGuestLogin = (params) => {
    const [value, setValue] = useState(null);
    const { status, data, error,refetch } = useQuery(['guest_login', params], () => _post('admin-api/guest/login',params),
        {
            enabled: false,
            // refetchOnWindowFocus: false,
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
