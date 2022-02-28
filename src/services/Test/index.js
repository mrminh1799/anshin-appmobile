import {useQuery, useQueryClient, useMutation, useQueries} from 'react-query';
import {_custom, _get, _put, _post} from '@/modules/api';
import {useEffect, useState} from "react";
import axios from "axios";
import {COMMON} from "@/constants";
import {blobToBase64, createSuffixParam} from '../Utils';
import _ from "lodash";

export const useFetchUsers = () => useQuery('users', () => _get('/User/'), {staleTime: 2000});

export const useFetchUser = (params) => useQuery('users', () => _get('/User/' + params.id));

export const useAddUser = (params) => {
    const queryClients = useQueryClient();
    return useQuery(['users', params], () => _put('/User/', params));
};

// export const useGetAllBanners = () => useQuery('get_all_banners', ( params) => _custom('Banner/getAll',params,'GET','http://10.14.121.6:7888/' ) );


export const useGetAllBanners = (params) => {
    const [value, setValue] = useState(null);
    const {
        status,
        data,
        error
    } = useQuery(['get_all_banners', params], () => _post('business-api/Banner/fetch-banner', params),
        {
            onSuccess: data => {
                if (data?.code == 'API-000') setValue(_.sortBy(data?.data, 'orderNumberBannerConfig'))
            },
            onError: error => {
                setValue({});
            }
        });
    return {
        status, error, value, data
    }
}
//lấy tin tức itel
export const useGetAllNews = (params) => {
    const [value, setValue] = useState(null);
    const {
        status,
        data,
        error
    } = useQuery(['get_all_news', params], () => _post('business-api/News/searchNews', params),
        {
            onSuccess: data => {
                if (data?.code == 'API-000') setValue(data?.data)
            },
            onError: error => {
                console.log(error)
                setValue({});
            }
        });
    return {
        status, error, value
    }
}
//lay thon tin user dang nhap
export const useGetUserInfor = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_infor_user', params], () => _get(COMMON.SUFFIX_API.INTEGRATION + 'itel/pps?phone=' + params.phone));
    return {
        status, error, data, refetch
    }
}
//truy van thong tin tk thuebao
export const useGetSubscriberBalance = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        isSuccess,
        isFetching
    } = useQuery(['get_subcriber_balance', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/getsubscriberbalance', params));
    return {
        status, error, data, refetch, isSuccess, isFetching
    }
}
//truy van thong tin tk thuebao
export const useGetCurrentPackage = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_current_package', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/getCurrentPackage', params));
    return {
        status, error, data, refetch
    }
}

//check blacklist
export const useGetBlacklist = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery(['get_blacklist', params], () => _get(COMMON.SUFFIX_API.BUSINESS_API + 'BlackListSub/check?phone=' + params.phone),{enabled: false});
    return {
        status, error, data, refetch, remove
    }
}

export const useGetImage = (params) => {
    const [base64Img, setImg] = useState(null);
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_image_by_path', params], () => axios.get('http://10.14.121.6/api/' + createSuffixParam('file-api/load', params), {
            headers: {
                'Content-Type': 'Application/json'
            },
            responseType: 'blob'
        }),
        {
            onSuccess: (data) => {
                blobToBase64(data.data).then(base64 => {
                    let source = base64.split(",");
                    setImg(source[1]);
                })
            }
        })
    return {
        status, error, base64Img,
    }
}
export const useGetListImage = (lsNew) => {
    const res = useQueries(lsNew.map(item => {
        const path = item.path;
        return {
            queryKey: ['get_image_with_path', path],
            queryFn: () => axios.get('http://10.14.121.6:6083/' + createSuffixParam(params), {
                headers: {
                    'Content-Type': 'Application/json'
                },
                responseType: 'blob'
            }),

        }
    }))
    var isLoading = res.some(query => query.status == 'loading');
    //chua biet viet kieu gi .....
}

