import React, {useEffect, useState} from 'react';
import {Box, CloseIcon, HStack, Image, Text, useDisclose, useTheme} from "native-base";
import {Actionsheet, Button, DialogBoxService} from "@/components";
import {TouchableOpacity, useWindowDimensions, View} from "react-native";
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from "@/styles/Colors";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import RenderHtml from "react-native-render-html";
import moment from "moment";
import DoneIcon from "../../../assets/icons/Done_ring_round.svg"

const RenderItemDataPackage = ({packageItem}) => {
    const {height, width} = useWindowDimensions();
    const {colors} = useTheme()
    const {t, i18n} = useTranslation(['Common', 'HomePage', 'Settings'], {i18n});
    const {isOpen, onOpen, onClose} = useDisclose()
    const [state, setState] = useState(false);


    // đăng ký gói cước
    const registerDataPackage = () => {
        DialogBoxService.alert(`${t('functiondevelopment', {ns: 'Settings'})}`)
    }
    useEffect(() => {

        if (state === true) {
            // onOpen()
        }

    }, [state])
    const onCloseActioSheet = (value) => {
        console.log(value)
        setState(
            prevState => !prevState
        )
    }
    const onChangeSwitch = (value) => {
        // onOpen()

        setState(value)
        if (value === true) {

        }

    }
    const tagsStyles = {
        body: {
            whiteSpace: 'normal',
            color: 'rgba(0, 0, 0, 0.6)',
        },
        p: {
            whiteSpace: 'normal',
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: 12,
            lineHeight: 14.06
        },
        span: {
            whiteSpace: 'normal',
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: 12,
            lineHeight: 14.06
        }
    };
    const ignoredStyles = ['color']

    const convertHtmlTitle = (item, key) => {
        if (!item) return ''
        if (i18n?.language === 'vi') return item[key + 'VI']?.replace(/\\/g, '')
        else return item[key + 'EN']?.replace(/\\/g, '')
    }

    const checkTime = (fromDate, toDate) => {
        // const test = moment(new Date()) <= moment(toDate)
        // const test2 = moment(new Date()) >= moment(fromDate)
        // console.log('fromDate', moment(fromDate).format("DD/MM/YYYY"))
        // console.log('toDate', moment(toDate).format("DD/MM/YYYY"))
        // console.log('test', test, test2)

        return moment(new Date()).isBetween(moment(fromDate), moment(toDate));
    }

    const price = checkTime(packageItem.fromDate, packageItem.toDate) ? packageItem.price : packageItem.cost;

    return (
        <Box bg={'white'} p={'16px'} flex={1} rounded={12} mb={'14px'}>
            <HStack alignItems={'center'} flex={1}>
                <Box flex={0.5}>
                    <LinearGradient start={{x: 0, y: 0.25}} end={{x: 1.25, y: 0}}
                                    style={{
                                        borderRadius: 8,
                                        minHeight: 163,
                                        minWidth: 90,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    colors={['#FF5647', '#D270F9',]}>
                        <Text fontStyle={'italic'} fontWeight={'900'} fontSize={24}
                              lineHeight={28.13} textAlign={'center'}
                              color='white'>{packageItem.code}</Text>
                    </LinearGradient>
                </Box>
                <Box ml={'16px'} flex={1} justifyContent={'space-between'}>
                    <View style={{flexDirection: 'row'}}>
                        {
                            convertHtmlTitle(packageItem, 'promotion') &&
                            <DoneIcon/>
                        }
                        <RenderHtml
                            baseStyle={{
                                whiteSpace: 'normal',
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontSize: 12,
                                lineHeight: 14.06,
                                paddingLeft: 9
                            }}
                            ignoredStyles={ignoredStyles}
                            tagsStyles={tagsStyles}
                            enableCSSInlineProcessing={false}
                            enableUserAgentStyles={false}
                            source={{html: convertHtmlTitle(packageItem, 'promotion')}}
                        />
                    </View>
                    <Box flexDir={'row'} flex={1} alignItems={'flex-end'} justifyContent={'space-between'}>
                        <Box justifyContent={'center'}>
                            <Text color={'redBase'} fontWeight={'700'}>{String(price)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
                            <Text color={'redBase'}
                                  fontWeight={'700'}>{packageItem?.duration + ' '}{i18n?.language === "vi" ? packageItem?.unit.toLowerCase() : packageItem?.unitEn.toLowerCase()}</Text>
                        </Box>
                        <Button onPress={registerDataPackage} _text={{
                            color: 'white',
                            fontSize: 12,
                            fontWeight: 'bold',
                            paddingHorizontal: 20,
                            paddingVertical: 12
                        }}
                                borderRadius={26}
                                backgroundColor={Colors.light.redBase}>
                            {t('REGISTERlower', {ns: "DataLib"})}
                        </Button>
                    </Box>
                </Box>
            </HStack>
            <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
                <Actionsheet.Content borderTopRadius="20">
                    <Box minH={height / 1.5} w={width}>
                        <Box
                            mt={'8px'}
                            alignItems={'flex-end'}
                            mr={5}
                        >
                            <TouchableOpacity onPress={onClose}>
                                <CloseIcon size="4"/>
                            </TouchableOpacity>
                        </Box>
                        <Box mt={5} h={'40%'} alignItems={'center'}>
                            <Image alt='images' rounded={4} w={'40%'} flex={1}
                                   source={require('../../../assets/images/sport/2.png')}/>
                        </Box>
                        <Box alignItems={'center'} mt={10}>
                            <Text fontSize={24} fontWeight={'700'} lineHeight={'41'}>
                                {t('ConfirmRegister', {ns: "Common"})}
                            </Text>
                            <Text fontSize={16} fontWeight={'400'} lineHeight={'25'} color={Colors.light.textGray}>
                                {t('ConfirmUseThisData?', {ns: "Common"})}
                            </Text>
                        </Box>
                        <Box alignItems={'center'} mt={'16px'}>
                            <Button onPress={onOpen} _text={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
                                    borderRadius={26}
                                    height={58}
                                    width={width - 144}
                                    style={{height: 48, width: 148, borderRadius: 26}}
                                    backgroundColor={Colors.light.redBase}>
                                {t('AGREE', {ns: "Common"})}
                            </Button>
                        </Box>
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    )
}
RenderItemDataPackage.propTypes =
    {
        packageItem: PropTypes.object
    }
export default RenderItemDataPackage
