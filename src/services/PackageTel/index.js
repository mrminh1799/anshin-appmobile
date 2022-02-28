import {useQuery,} from 'react-query';
import {_post} from '@/modules/api';
import {useState} from "react";
import {COMMON} from "@/constants";

//load adll thông tin gói cước
export const useGetAllChargePackages = (params) => {
    const [value, setValue] = useState(null);
    const {
        status,
        error,
        refetch
    } = useQuery(['charge-packages', params], () => _post(COMMON.SUFFIX_API.BUSINESS_API + 'ChargePackage/searchChargePackage', params),
        {
            refetchOnWindowFocus: true,
            onSuccess: data => {
                setValue([...data?.data])
            },
            onError: error => {
                setValue({});
            },
        });
    return {
        status, error, value, refetch
    }
}
