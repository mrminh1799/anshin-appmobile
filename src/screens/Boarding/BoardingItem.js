import React, {useEffect, useState} from 'react';
import {Box, Button, useTheme,} from 'native-base';
import {useWindowDimensions, Image, TouchableOpacity, Text, TouchableWithoutFeedback, Linking} from 'react-native';
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import RenderHtml from "react-native-render-html";


const BoardingItem = ({item, pathParse, language, onPress, onChangeIndex}) => {
    const {colors} = useTheme();
    const {height, width} = useWindowDimensions();
    const [path, setPath] = useState()
    const {t, i18n} = useTranslation(['Common'], {i18n});

    useEffect(() => {
        setPath(pathParse)
    }, [item?.path])


    const renderHtmlTitle = () => {
        return (
            <Box flex={1} mt={'64px'} alignItems={'center'} p={10}>
                <RenderHtml
                    contentWidth={width}
                    source={{html: language === 'vi' ? (item?.titleVi ? item?.titleVi : "") : (item?.titleEn ? item?.titleEn : '')}}
                />
                <RenderHtml
                    contentWidth={width}
                    source={{html: language === 'vi' ? (item?.ndTitleVi ? item?.ndTitleVi : "") : (item?.ndTitleVi ? item?.ndTitleVi : '')}}
                />
            </Box>
        )

    }

    const openLink = () => {
        if (item.link) {
            Linking.openURL(item?.link);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => openLink()} style={{flex: 1, zIndex: 99999}}>
            <Box zIndex={9999} flex={1} bg={colors.primaryContrast}>
                <Box flex={2} justifyContent={'center'} alignItems={'center'}>
                    <Image style={{position: 'absolute', top: height / 4, left: 0}} alt="image"
                           source={require('../../assets/images/boarding/rectangle.png')}/>
                    <Image style={{position: 'absolute', top: height / 1.5, left: 20}} alt="image"
                           source={require('../../assets/images/boarding/rectangle-1.png')}/>
                    <Image
                        resizeMode={"stretch"}
                        style={{position: 'absolute', zIndex: 999, top: height / 8, width: width, height: height / 3}}
                        source={{cache: 'reload', uri: path}}/>
                </Box>
                {renderHtmlTitle()}
                <Box
                    position={'absolute'}
                    right={0}
                    top={35}
                    cursor={'pointer'}
                    width={'auto'}
                    height={'auto'}
                    padding={5}>
                    <TouchableOpacity style={{width: 40, height: 40}}
                                      onPress={onChangeIndex}>
                        <Text>Tiếp</Text>
                    </TouchableOpacity>
                </Box>
                <Box zIndex={9999} flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Button onPress={onPress} _text={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
                            mt={'40px'}
                            style={{height: 48, width: 148, borderRadius: 26}} bg={colors.splash}>
                        {t('start')}
                    </Button>
                </Box>
            </Box>
        </TouchableWithoutFeedback>
    );
};

BoardingItem.propTypes = {
    item: PropTypes.object,
    language: PropTypes.any,
    pathParse: PropTypes.any,
    onPress: PropTypes.func,
    delayTime: PropTypes.any,
    onChangeIndex: PropTypes.func,
};

export default BoardingItem;
