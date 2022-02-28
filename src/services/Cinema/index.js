import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native';
import { useQuery } from 'react-query';
import { COMMON } from "@/constants";
import { _get, _post } from '@/modules/api';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';
export const useGetCategory = ({ timeString }) => {
    const [categoryList, setCategory] = useState(null);
    const { t, i18n } = useTranslation(['Error'], { i18n });
    const {
        status,
        data,
        error,
        refetch
    } = useQuery('get_category', () => _post(COMMON.SUFFIX_API.INTEGRATION + 'FrequentQuestion/query', {
        os: Platform.OS,
        time: timeString
    }),
        {
            staleTime: 1000,
            onSuccess: data => {
                //console.log("get_question_success ------->" + JSON.stringify(data))
                if (data?.status == 'SUCCESS') {
                    setCategory(data.data);
                }
            },
            onError: error => {
                DialogBoxService.alert(t('errorTitle'), null)
            },
            // enabled: false

        });
    return {
        status, error, categoryList
    }
}