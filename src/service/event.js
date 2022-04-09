import {useQuery, useQueryClient, useMutation, useQueries} from 'react-query';
import {_custom, _get, _put, _post, _delete} from '../../src/component/callAPI/index';

//get all event
export const useGetAllEvents = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_all_events', params], () => _get('admin/saleEvent/findAll'), {enabled: false});
    return {
        status, error, data, refetch
    }
}

//tim sp theo event id
export const useGetSpByEventId = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_all_events', params], () => _get('discount/findBySaleEventId/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//thay doi trang thai event
export const useChangeStatusEvent = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['change_status_event', params], () => _get('discount/updateStatusEventById/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//xoa sp trong discount
export const useDeleteProductDiscount = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['delete_product_discount', params], () => _delete('admin/Discount/delete/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch
    }
}
// update discount
export const useUpdateDiscount = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['update_discount', params], () => _put('discount/updateDiscount/' + params?.id, params), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//xoa discount
export const useDeleteDiscount = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['delete_discount', params], () => _delete('admin/Discount/delete/' + params?.id), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//them sp discount
export const useCreateProDiscount = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['add_product_discount', params], () => _post('admin/Discount/create/' + params?.discount + '/' + params?.idProduct + '/' + params?.idEvent + '/' + params?.styleDiscount), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//them event
export const useCreateEvent = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['add_event', params], () => _post('admin/saleEvent/insert',params), {enabled: false});
    return {
        status, error, data, refetch
    }
}
//them event
export const useUpdateEvent = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['update_event', params], () => _post('admin/saleEvent/update',params), {enabled: false});
    return {
        status, error, data, refetch
    }
}