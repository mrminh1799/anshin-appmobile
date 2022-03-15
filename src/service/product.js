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

//tim size theo id
export const useGetSizeProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_size_product', params], () => _get('size/findByProductId/' + params?.id));
    return {
        status, error, data, refetch
    }
}

//tim color theo id
export const useGetColorProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_color_product', params], () => _get('color/findByProductId/' + params?.id));
    return {
        status, error, data, refetch
    }
}

//check xem sp con size mau so luong khong
export const useGetCheckProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_check_product', params], () => _get('productDetail/finByColorSizeProduct/' + params?.idColor +'/'+ params?.idSize + '/' +params?.idProduct),{enabled:false});
    return {
        status, error, data, refetch
    }
}

//dat hang
export const useOrder = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_order_product', params], () => _post('Order/newOrder' ,params),{enabled:false});
    return {
        status, error, data, refetch
    }
}