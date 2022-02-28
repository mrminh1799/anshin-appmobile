import {SwiperCarousel} from "@/components";
import PropTypes from "prop-types";
import {Image, useWindowDimensions, View} from "react-native";
import {Box} from "native-base";
import RenderHtml from "react-native-render-html";
import React from "react";
import {COMMON} from "@/constants";

const BannerPackage = ({banners, language}) => {
    const {height, width} = useWindowDimensions();

    const _renderItem = ({item}) => {
        const html = `<div style="line-height: 0px">${language === 'vi' ? item?.titleVi : item?.titleEn}${language === 'vi' ? item?.ndTitleVi : item?.ndTitleEN}</div>`
        return (
            <View style={{flex: 1}}>
                <Image resizeMode={'stretch'} style={{height: 151, borderRadius: 4}}
                       source={{uri: COMMON.IMAGE_UPLOAD + item?.path}}/>
                <Box mx={3}>
                    <RenderHtml
                        contentWidth={width}
                        enableExperimentalMarginCollapsing={true}
                        enableExperimentalBRCollapsing={true}
                        enableExperimentalGhostLinesPrevention={true}
                        source={{html: html}}
                    />
                </Box>
            </View>
        )
    }

    return (
        banners.length > 0 ?
            <SwiperCarousel
                data={banners}
                layout={'default'}
                renderItem={_renderItem}
                sliderWidth={width}
                itemWidth={width / 1.3}
                firstItem={0}
                inactiveSlideScale={0.94}
                inactiveSlideShift={20}
                containerCustomStyle={{
                    overflow: 'hidden'
                }}
                contentContainerCustomStyle={{
                    paddingVertical: 10
                }}
                loop={true}
                autoplay={true}
                autoplayDelay={1000}
                autoplayInterval={3000}
            />
            :
            <></>
    )

}


BannerPackage.propTypes = {
    banners: PropTypes.any,
    language: PropTypes.object
}
export default BannerPackage;
