import {useQuery, useQueryClient, useMutation} from 'react-query';
import {_custom, _get, _put, _post, _delete} from '@/modules/api';
import {useState} from "react";


//lien ket tai khoan mang xa hoi
export const useSocialLoginConfig = (params) => {
    const [value, setValue] = useState(null);
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['connect_social_login', params], () => _put('admin-api/social/update', params),
        {
            enabled: false,
            // refetchOnWindowFocus: false,
            onSuccess: data => {
                setValue(data?.body)
            },
            onError: error => {
                setValue({});
            }
        });
    return {
        status, error, value, refetch, data
    }
}
//lien ket tai khoan mang xa hoi
export const useRemoveSocialLoginConfig = (params) => {

    const [value, setValue] = useState(null);
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['remove_social_login', params], () => _delete('admin-api/social/remove?loginType=' + params.loginType),
        {
            enabled: false,
            // refetchOnWindowFocus: false,
            onSuccess: data => {
                setValue(data?.body)
            },
            onError: error => {
                console.log(error)
                setValue({});
            }
        });
    return {
        status, error, value, refetch
    }
}

