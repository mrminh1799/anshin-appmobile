import React, {useEffect, useRef, useState} from 'react'
import {useWindowDimensions} from "react-native";
import RenderItem from "@/screens/Home/BannerDashboard/RenderItem"
import {Box} from "native-base";
import PropTypes from "prop-types";
import {useGetAllBanners} from "@/services/Test";
import {COMMON, CONFIG} from "@/constants";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {SwiperBanner} from "@/components";
import normalize from "@/utils/Normalize";

// eslint-disable-next-line react/prop-types

const BannerDashboard = ({bannerDashboardTop, language}) => {
    const {height, width} = useWindowDimensions();
    const {t, i18n} = useTranslation(['Footer', 'ServicePage'], {i18n});
//lọc lấy ra banner top
    const {value, data} = useGetAllBanners({
        "positionCode": CONFIG.DASHBOARD.POSITION,
        "screenCode": CONFIG.DASHBOARD.SCREEN
    });

    const refs = useRef();
    const [index, setIndex] = useState(0);

    const sorted = _.sortBy(value, 'orderNumberBannerConfig')
    const timer = _.sortBy(value, 'orderNumberBannerConfig')?.map(item => item?.delayTime)
    let timmeOut = null;

//render item
    const renderBanner = () => {
        if (value?.length > 0) {
            return sorted.map((item, index) => {
                return (<RenderItem
                        key={index}
                        patParse={COMMON.IMAGE_UPLOAD + item?.path}
                        item={item}
                        language={i18n?.language}
                    />
                );
            });
        }
    };

    useEffect(() => {
        timmeOut && clearTimeout(timmeOut);
        if (timer?.length > 0) {
            let timeout = timer[index];
            if (timeout) {
                timmeOut = setTimeout(() => {
                    onChangeIndex()
                }, timeout * 1000)
            }
        }
        return () => {
            clearTimeout(timmeOut);
        }
    }, [index, timer])

    const onChangeIndex = () => {
        setIndex(index => index + 1)
    }

    const indexEndToHide = (index) => {
        if (index >= value.length - 1) {
            setTimeout(() => {
                setIndex(0)
            }, timer[index] * 1000)
        }
    }
    return (
        <Box flex={1}>
            <SwiperBanner ref={refs}
                          maxHeight={normalize(280, 'height')}
                          width={width}
                          showsPagination={false}
                          onIndexChanged={indexEndToHide}
                          index={index} autoplay={false}>
                {renderBanner()}
            </SwiperBanner>
        </Box>
    )
}
BannerDashboard.PropTypes = {
    bannerDashboardTop: PropTypes.object,
    language: PropTypes.any
}
export default BannerDashboard
