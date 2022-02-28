import React, {useEffect, useRef, useState} from 'react';
/*Import Component*/
import {SwiperBanner} from '@/components';
import {registerScreen} from '@/navigators/utils';
import {useAuth} from '@/contexts';
import BoardingItem from '@/screens/Boarding/BoardingItem';
import {useTranslation} from "react-i18next";
import _ from "lodash";
import {useGetAllBanners} from "@/services/Test";
import {COMMON, CONFIG} from "@/constants";

import Storage from "@/utils/Storage";
import {Box} from "native-base";


/* Init screen*/
const Name = 'Boarding';

const options = {
    stackAnimation: 'fade',
};

const Boarding = () => {
    const {setBoarding} = useAuth();
    const {t, i18n} = useTranslation(['Footer', 'ServicePage'], {i18n});
    //lấy ra banner boarding
    const {value, data} = useGetAllBanners({
        "positionCode": CONFIG.ONBOARDING.POSITION,
        "screenCode": CONFIG.ONBOARDING.SCREEN
    });
    const refs = useRef();
    const [index, setIndex] = useState(0);

    const timer = _.sortBy(value, 'orderNumberBannerConfig')?.map(item => item?.delayTime)
    //When user press start hide boarding
    const handleHiddenBoarding = async () => {
        setBoarding(false);
        setIndex(0);
        await Storage.save(COMMON.STATUS_ON_BOARDING, false);
    };

    let timmeOut = null;

    useEffect(() => {
        timmeOut && clearTimeout(timmeOut);
        if (timer?.length > 0) {
            if (timer?.length === 1) {
                let timeout = timer[0];
                if (timeout) {
                    timmeOut = setTimeout(() => {
                        handleHiddenBoarding()
                    }, timeout * 1000)
                }
            } else {
                let timeout = timer[index];
                if (timeout) {
                    timmeOut = setTimeout(() => {
                        onChangeIndex()
                    }, timeout * 1000)
                }
            }
        }
        return () => {
            clearTimeout(timmeOut);
        }
    }, [index, timer])

    /**
     * Render dynamic boarding by list
     * @returns {Component}
     */
    const renderItemBoarding = () => {
        if (value?.length > 0) {
            return value.map((item, ord) => {
                return (<BoardingItem
                        key={ord}
                        pathParse={COMMON.IMAGE_UPLOAD + item?.path}
                        onChangeIndex={onChangeIndex}
                        item={item}
                        language={i18n?.language}
                        onPress={handleHiddenBoarding}/>
                );
            });
        }
    };


    const onChangeIndex = () => {
        setIndex(index => index + 1)
    }

    const indexEndToHide = (index) => {
        if (index >= value.length - 1) {
            setTimeout(() => {
                handleHiddenBoarding()
            }, timer[index] * 1000)
        }
    }

    return (
        <SwiperBanner ref={refs} onIndexChanged={indexEndToHide} index={index} autoplay={false}>
            {renderItemBoarding()}
        </SwiperBanner>
    );

};

export default registerScreen(Name, Boarding, options);
