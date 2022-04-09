import {useQuery, useQueryClient, useMutation, useQueries} from 'react-query';
import {_custom, _get, _put, _post} from '../../src/component/callAPI/index';
import {useEffect, useState} from "react";
import axiosHelper from "../common/axiosHelper";

import axios from "axios";

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
    } = useQuery(['get_all_product', params], () => _get('product/findByPage?currenPage=' + params.currenPage + '&sizePage=' + params.sizePage));
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

//top 10sp yeu thich
export const useGetTop10 = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_top10_product', params], () => _get('product/findByTop', params),{enabled:false});
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
    } = useQuery(['get_top10_product_sell', params], () => _get('product/findBySumTop' ,params),{enabled:false});
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
    } = useQuery(['get_list_order', params], () => _get('Order/findByAcountId/'+ params?.id),{enabled:false});
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
    } = useQuery(['get_list_cart', params], () => _get('cart/findByIdAcount2/'+ params?.id),{enabled:false});
    return {
        status, error, data, refetch
    }
}

//lay danh sach màu
export const useGetListColor = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_list_color', params], () => _get('color/findAll', params),{enabled:false});
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
    } = useQuery(['get_list_size', params], () => _get('size/findAll', params),{enabled:false});
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
    } = useQuery(['get_list_product_discount', params], () => _get('discount/findAll', params),{enabled:false});
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
    } = useQuery(['get_filter_product', params], () => _get('product/findByColorSizePrice/' + params?.idColor +'/'+ params?.idSize + '/' +params?.priceFrom + '/' + params?.priceTo),{enabled:false});
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
        refetch,remove
    } = useQuery(['get_confirm_pass', params], () => _get('test/confirmPassword/' + params?.id +'/'+ params?.password),{enabled:false});
    return {
        status, error, data, refetch,remove
    }
}
//doi pass
export const useChangePass = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_confirm_pass', params], () => _get('test/changePassword/' + params?.id +'/'+ params?.password),{enabled:false});
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
    } = useQuery(['get_update_infor', params], () => _put('test/updateAcount',params),{enabled:false});
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
    } = useQuery(['get_parent_cate', params], () => _get('Category/getNavBar'),{enabled:false});
    return {
        status, error, data, refetch
    }
}
//lay danh sach sp theo danh mục con
export const useGetProductChildCate = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_product_child_cate', params], () => _get('product/findAllByIdCategory/'+params?.id),{enabled:false});
    return {
        status, error, data, refetch
    }
}

//lay thong tin người dùng
export const useGetInforUser = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_info_user', params], () => _get('test/findBy/'+params?.id),{enabled:false});
    return {
        status, error, data, refetch
    }
}

//lay danh sach sp theo danh mục cha
export const useGetProductParentCate = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_product_parent_cate', params], () => _get('/product/findByCategoryParentId/'+params?.id),{enabled:false});
    return {
        status, error, data, refetch
    }
}
//lay danh sach sp theo danh mục cha
export const useAddCart = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['add_cart', params], () => _get('/cart/createForAcount/'+params?.id+'/'+params?.idProduct+'/'+params?.quantity),{enabled:false});
    return {
        status, error, data, refetch
    }
}