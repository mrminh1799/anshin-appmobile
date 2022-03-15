import {useQuery, useQueryClient, useMutation, useQueries} from 'react-query';
import {_custom, _get, _put, _post} from '../../src/component/callAPI/index';
import {useEffect, useState} from "react";
import axios from "axios";

//lay danh sp phan trang
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
//chitiet sp
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