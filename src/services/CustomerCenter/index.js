import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { COMMON } from "@/constants";
import { _get, _post } from '@/modules/api';
import _ from 'lodash';
export const useGetQuestion = () => {
    const [value, setValue] = useState(null);
    const [topic, setTopic] = useState(null);
    const {
        status,
        data,
        error,
        refetch
    } = useQuery('get_question', () => _post(COMMON.SUFFIX_API.BUSINESS_API + 'FrequentQuestion/query', {
        sample: {
            status: 1
        }
    }),
        {
            staleTime: 1000,
            onSuccess: data => {
                //console.log("get_question_success ------->" + JSON.stringify(data))
                //sort by string function
                if (data?.code == 'API-000') {
                    setValue(data?.data.sort((a, b) => a.question > b.question ? 1 : a.question < b.question ? -1 : 0))
                    let topicName = _.uniq(data?.data?.map(item => item.topic));
                    //console.log("Topic ------------> " + JSON.stringify(topicName));
                    setTopic(topicName);
                }
            },
            onError: error => {
                setValue({});
            },
            // enabled: false

        });
    return {
        status, error, value, topic, refetch
    }
}
