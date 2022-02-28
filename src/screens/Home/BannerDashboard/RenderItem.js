import React from 'react'
import {Box, Text, useTheme} from "native-base";
import {Image, Linking, useWindowDimensions, TouchableWithoutFeedback, Platform} from "react-native";
import PropTypes from "prop-types";
import RenderHtml from "react-native-render-html";
import normalize from "@/utils/Normalize";

const RenderItem = ({item, patParse, language}) => {
    const {height, width} = useWindowDimensions();
    const {colors} = useTheme()

    const openLink = () => {
        if (item.link) {
            Linking.openURL(item?.link);
        }
    }

    const tagsStyles = {
        body: {
            whiteSpace: 'pre-wrap',
            color: 'rgba(0, 0, 0, 0.6)',
            margin: 0,
            padding: 0,
            lineHeight: 'normal',
        },
        p: {
            whiteSpace: 'pre-wrap',
            padding: 0,
            color: 'rgba(0, 0, 0, 0.6)',
        },
        span: {
            whiteSpace: 'pre-wrap',
            padding: 0,
            color: 'rgba(0, 0, 0, 0.6)',
        }
    };

    const renderBannerTitle = () => {
        return `${language === 'vi' ? item?.titleVi : item?.titleEn}${language === 'vi' ? item?.ndTitleVi : item?.ndTitleEN}`
    }
    return (
        <TouchableWithoutFeedback onPress={() => openLink()} style={{flex: 1, zIndex: 99999}}>
            <Box flex={1}>
                <Image resizeMode={'stretch'} style={{width: width, height: normalize(173, 'height')}}
                       source={{uri: patParse}}/>
                <Box mx={3}>
                    <RenderHtml
                        contentWidth={width}
                        tagsStyles={tagsStyles}
                        enableExperimentalMarginCollapsing={true}
                        enableExperimentalBRCollapsing={true}
                        enableExperimentalGhostLinesPrevention={true}
                        source={{html: renderBannerTitle()}}
                    />
                </Box>
            </Box>
        </TouchableWithoutFeedback>
    )
}
export default RenderItem

RenderItem.propTypes = {
    item: PropTypes.object,
    language: PropTypes.any,
    base64Img: PropTypes.any,
    patParse: PropTypes.any
};
