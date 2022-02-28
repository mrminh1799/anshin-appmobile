import { useQuery } from "react-query";
import { useState } from "react";
import { _post } from "@/modules/api";
import { COMMON } from "@/constants";
import { DialogBoxService } from '@/components';
import { useTranslation } from "react-i18next";
import _ from "lodash";

// get lịch sử nạp tiền
export const useTopUpHistory = (params) => {
    const [rechargeList, setLs] = useState(null);
    const { t, i18n } = useTranslation(['TopUpHistory'], { i18n });
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['topup_history', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/getRechargeHistory', params), {
        enabled: !!params?.startDate,
        onSuccess: (data) => {
            //console.log("On success ---------------->" + JSON.stringify(data));
            if (data.code == '200') setLs(ListOrderByDate(data.result));
            else if (data.code == 'API-001' && data.message.includes("history period")) {
                setLs(null);
                DialogBoxService.alert(t('ErrorPeriod'), null)
            }
            else if (data.code == 'API-001' && data.message.includes("itelecom subscribers")) {
                setLs(null);
                DialogBoxService.alert(t('ErrorNumber'), null)
            }
            else DialogBoxService.alert('', null);
        },
        onError: error => {
            setLs(null);
        },
    });
    return {
        status, error, rechargeList, refetch
    }
}

export const useCdrDetail = (params) => {//lịch sử trừ cước
    const [cdrHistory, setCdr] = useState(null);
    const [smsNum, setSmsNum] = useState('');// tổng số tin sms nhận được
    const { t, i18n } = useTranslation(['TopUpHistory'], { i18n });
    const { status, data, error, refetch } = useQuery(['cdr_history', params], () => _post(COMMON.SUFFIX_API.INTEGRATION + 'itel/getCdrDetail', params), {
        enabled: !!params?.startDate,
        onSuccess: (data) => {
            // console.log("On success :" + JSON.stringify(data));
            if (data.code == '200') {
                setCdr(ListOrderByDate(data.result));
                if (params.type == 'sms') { // chỉ hiện thị tổng số tin nếu truyền lên sms
                    setSmsNum(data.result.length)
                }
                else setSmsNum('')
            }
            else if (data.code == 'API-001' && data.message.includes("history period")) {
                setCdr(null);
                DialogBoxService.alert(t('ErrorPeriod'), null)
            }

            else DialogBoxService.alert('', null);
        },
        onError: err => DialogBoxService.alert(JSON.stringify(err))
    })
    return {
        status, error, cdrHistory, smsNum, refetch
    }
}

const ListOrderByDate = (item) => {//sắp xếp thứ tự ngày
    if (!Array.isArray(item)) return null
    let newList = _.cloneDeep(item);
    return newList.sort((a, b) => {
        var first = new Date(a.transactionDateTime).getTime();
        var sec = new Date(b.transactionDateTime).getTime();
        if (first > sec) return -1
        else return 1
    })
}
