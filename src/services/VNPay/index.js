import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { _get, _post } from '@/modules/api';
import { COMMON } from "@/constants";
import { DialogBoxService } from '@/components';
import axios from 'axios';
export const useGetPaymentUrl = (params) => {
    const [value, setValue] = useState(null);

    const { status, data, error, refetch } = useQuery(['get_question', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'vnpay/get-pay-url', parseParams(params)),
        {
            staleTime: 1000,
            onSuccess: data => {
                if (data?.code == 'API-000') setValue(data?.data)
                else DialogBoxService.alert('Co loi xay ra' + JSON.stringify(data))
            },
            onError: error => {
                DialogBoxService.alert(JSON.stringify(error), null)
            },
            enabled: false

        });
    return {
        status, error, value, refetch
    }
}

export const useGetProvider = () => {
    const testData = {
        "req_id": "11111",
        "req_time": "1622609412172",
        "agen_code": "ITELECOM",
        "svc_code": "PREPAID_CARD",
        "checksum": "00fe69b929a5a02b3a9f39eb9bb0f3123b69bd76ab16149a76926075b323d1de3084dbd74a8d645b4de7e3c512907023b3c0f06cc10c2123c5be6a2edd92fcd7"
    }
    const [value, setValue] = useState(null);
    const { status, data, error, } = useQuery(['get_provider_topup'], () => axios.post('https://dms-api.vnpay.vn/get-provider', testData),
        {
            staleTime: 1000,
            onSuccess: res => {
                if (res?.data?.code == '00') setValue(res.data.data)
                else DialogBoxService.alert('Co loi xay ra')
            },
            onError: error => {
                DialogBoxService.alert(JSON.stringify(error), null)
            },

        });
    return {
        status, error, providerList: value
    }
}

export const useGetProduct = () => {
    const [productLs, setProduct] = useState(null);
    const [vendorLs, setVendor] = useState(null);
    const { status, data, error, } = useQuery(['get_product_topup'], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'vnpay/get-product', {
        provider_code: "",
        type: 1
    }),
        {
            staleTime: 1000,
            onSuccess: res => {
                if (res.code == 'API-000') {
                    setProduct(res.data.products);
                    setVendor(res.data.vendors);
                }
                else DialogBoxService.alert('Co loi xay ra')
            },
            onError: err => DialogBoxService.alert(JSON.stringify(err))

        });
    return {
        status, error, productLs, vendorLs
    }
}

const parseParams = (paymentInfo) => {
    if (paymentInfo.service == 'NT') return {
        amount: paymentInfo.price,
        phone: paymentInfo.phoneRecharge,
        type: paymentInfo.service,
        returnUrl: "https://app.itel.vn/vnpay/VnPayReturn/index.html",
        providerCode: paymentInfo.providerCode
    }
    else return {
        amount: paymentInfo.price,
        phone: paymentInfo.phoneRecharge,
        type: paymentInfo.service,
        returnUrl: "https://app.itel.vn/vnpay/VnPayReturn/index.html",
        providerCode: paymentInfo.providerCode,
        operator: paymentInfo.vendorCode,
        quantity: paymentInfo.quantity,
        email: paymentInfo.email
    }
}
