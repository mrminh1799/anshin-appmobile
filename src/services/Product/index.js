import {useQuery, useQueryClient, useMutation} from 'react-query';
import {_custom, _delete, _get, _post, _put} from '@/modules/api';
import {useState} from "react";
import {DialogBoxService} from "@/components";
import {COMMON} from "@/constants";

//lay tat ca sp
export const useGetAllProducts = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_all_product', params], () => _get('product/findByPage?currenPage=' + params.currenPage + '&sizePage=' + params.sizePage));
    return {
        status, error, data, refetch
    }
}

//lay chi tiet sp
export const useGetDetailProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_detail_product', params], () => _get('product/findById/' + params?.id),{enabled:false});
    return {
        status, error, data, refetch
    }
}
