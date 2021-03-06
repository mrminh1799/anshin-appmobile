import {useQuery} from 'react-query';
import {_delete, _get, _post} from '../../src/component/callAPI/index';
import axiosHelper from "../common/axiosHelper";
import {createGet, createPost} from "./utils";

//getallproduct
export const useGetProducts = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_products', params], () => _get('product/findAll'));
    return {
        status, error, data, refetch
    }
}
//lay danh sp phan trang
export const useGetAllProducts = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_all_product', params], () => _get('product/findAll'), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//lay danh sp phan trang
// export const useGetProducts = (params) => {
//     const {
//         status,
//         data,
//         error,
//         refetch
//     } = useQuery(['get_product', params], () => _get('product/findAll'));
//     return {
//         status, error, data, refetch
//     }
// }
//chitiet sp
export const useGetDetailProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_detail_product', params], () => _get('product/findById/' + params?.id), {enabled: false});
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
    } = useQuery(['get_check_product', params], () => _get('productDetail/finByColorSizeProduct/' + params?.idColor + '/' + params?.idSize + '/' + params?.idProduct), {enabled: false});
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
    } = useQuery(['get_order_product', params], () => _post('Order/newOrder', params), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//top 10sp yeu thich
export const useGetTop10 = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_top10_product', params], () => _get('product/findByTop', params), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//top 10sp yeu ban chay
export const useGetTop10Sell = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_top10_product_sell', params], () => _get('product/findBySumTop', params), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//danh sach order khach hang
export const useGetListOrder = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_list_order', params], () => _get('Order/findByAcountId/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//lay danh sach sp trong cart theo accountid
export const useGetListCart = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_list_cart', params], () => _get('cart/findByIdAcount2/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//lay danh sach m??u
export const useGetListColor = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_list_color', params], () => _get('color/findAll', params), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//lay danh sach size
export const useGetListSize = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_list_size', params], () => _get('size/findAll', params), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//lay danh sach sp khuyeens maix
export const useGetProductDiscount = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_list_product_discount', params], () => _get('discount/findAll', params), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//filter product
export const useGetFilterProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_filter_product', params], () => _get('product/findByColorSizePrice/' + params?.idColor + '/' + params?.idSize + '/' + params?.priceFrom + '/' + params?.priceTo), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//xac nhan pass cu
export const useConfirmPass = (params) => {
    const {
        status,
        data,
        error,
        refetch, remove
    } = useQuery(['get_confirm_pass', params], () => _get('test/confirmPassword/' + params?.id + '/' + params?.password), {enabled: false});
    return {
        status, error, data, refetch, remove
    }
}
//doi pass
export const useChangePass = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_confirm_pass', params], () => _get('test/changePassword/' + params?.id + '/' + params?.password), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//cap nhat thong tin
export const useUpdateInfor = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_update_infor', params], () => _post('test/updateAcount', params), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//lay danh muc cha
export const useGetParentCate = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_parent_cate', params], () => _get('Category/getNavBar'), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//lay danh sach sp theo danh m???c con
export const useGetProductChildCate = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_product_child_cate', params], () => _get('product/findAllByIdCategory/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//lay thong tin ng?????i d??ng
export const useGetInforUser = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_info_user', params], () => _get('test/findBy/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//lay danh sach sp theo danh m???c cha
// export const useGetProductParentCate = (params) => {
//     const {
//         status,
//         data,
//         error,
//         refetch
//     } = useQuery(['get_product_parent_cate', params], () => _get('/product/findByCategoryParentId/'+params?.id),{enabled:false});
//     return {
//         status, error, data, refetch
//     }
// }

export const GetProductParentCate = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'useGetProductParentCate', '/product/findByCategoryParentId/' + params?.id, params, _callback);
}

//lay danh sach sp theo danh m???c cha
// export const useAddCart = (params) => {
//     const {
//         status,
//         data,
//         error,
//         refetch
//     } = useQuery(['add_cart', params], () => _post('/cart/createForAcount/'+params?.id+'/'+params?.idProduct+'/'+params?.quantity),{enabled:false});
//     return {
//         status, error, data, refetch
//     }
// }

export const addCart = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'useAddCart', 'cart/createForAcount/' + params?.id + '/' + params?.idProduct + '/' + params?.quantity, params, _callback);
}
//l???y ???nh theo product

export const useGetImageProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_image_product', params], () => _get('/productDetail/findImage/' + params?.idProduct + "/" + params?.idColor), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//xoa sp trong cart theo acc
export const useDeleteCartProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery(['delete_cart_product', params], () => _delete('/cart/deleteByidProduct/' + params?.idAcount + "/" + params?.idProduct), {enabled: false});
    return {
        status, error, data, refetch, remove
    }
}
//cap nhat trang thai order
export const useUpdateStatusOrder = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery(['update_status_order', params], () => _get('Order/updateStatus/' + params?.idOrder + "/" + params?.status), {enabled: false});
    return {
        status, error, data, refetch, remove
    }
}
//xoa tat ca sp trong gio hang
export const useDeleteProductAllCart = (params) => {
    const {
        status,
        data,
        error,
        refetch,
        remove
    } = useQuery(['delete_all_product_cart', params], () => _delete('cart/deleteAllByIdAccount/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch, remove
    }
}
//lay tinh thanh ph???
export const findCity = () => {
    return axiosHelper.get("https://provinces.open-api.vn/api/?depth=3");
}

export const getFilterProduct = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'getFilterProduct', 'product/findByColorSizePrice/' + params?.idColor + '/' + params?.idSize + '/' + params?.priceFrom + '/' + params?.priceTo, params, _callback);
}

export const updateStatusOrder = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'updateStatusOrder', 'Order/updateStatus/' + params?.idOrder + "/" + params?.status, params, _callback);
}

export const getHistoryOrder = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'getHistoryOrder', 'Order/getHistoryOrder/' + params?.idOrder, params, _callback);
}
