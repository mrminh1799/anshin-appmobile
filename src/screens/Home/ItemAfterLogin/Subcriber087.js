import React, {useState} from 'react'
import {Box, HStack, Icon, Image, Text, useTheme} from "native-base";
import {TouchableOpacity, useWindowDimensions} from "react-native";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import TopUpModal from '../TopUp';
import moment from 'moment';
import {COMMON} from "@/constants";
import {navigate} from "@/navigators/utils";
import {DialogBoxService} from "@/components";
import {useAuth} from "@/contexts";
import IconMobile from "../../../assets/icons/iconSVG/icondt.svg"
import IconWallet from "../../../assets/icons/iconSVG/Wallet.svg"
import IconGraph from "../../../assets/icons/iconSVG/Graph.svg"
import IconChart from "../../../assets/icons/iconSVG/Chart.svg"

// eslint-disable-next-line react/prop-types
const Subcriber087 = ({getUserInfor, getSubscriberAccount, currentPackage}) => {
    const {colors} = useTheme();
    const {t, i18n} = useTranslation(['HomePage', ['ServicePage'], 'Common', 'Settings'], {i18n});
    const {userInfo} = useAuth();
    const {width} = useWindowDimensions()


    const openModal = () => {
        navigate("TopUpModal");
    }

    const mainPackage = currentPackage?.result?.filter(item => item?.dataMain)

    const toThongTinTaiKhoan = () => {
        if (userInfo?.userData?.groupAppCode === '087') {
            navigate('ThongTinTaiKhoan')
        } else {
            DialogBoxService.alert(`${t('PleaseItenumber', {ns: 'Settings'})}`)
        }
    }
    const toThongTinThueBao = () => {
        if (['087'].includes(userInfo?.userData?.groupAppCode)) {
            navigate('ThongTinThueBao')
        } else {
            DialogBoxService.alert(`${t('PleaseItenumber', {ns: 'Settings'})}`)
        }
    }


    return (
        <>
            {/*<Box>*/}
            {/*    <TouchableOpacity onPress={toThongTinThueBao}>*/}
            {/*        <Box bg={'redPlum'} mx={4} rounded={4}>*/}
            {/*            <HStack my={3.5}>*/}
            {/*                <Box alignItems={'center'} flex={1}>*/}
            {/*                    <HStack alignItems={'center'}>*/}
            {/*                        <IconMobile/>*/}
            {/*                        <Text ml={3} color='white' fontWeight={'700'} fontSize={'16'}*/}
            {/*                              lineHeight={'18.75'}>0{(getUserInfor?.data?.msisdn)?.substring('2', getUserInfor?.data?.msisdn.length)}</Text>*/}
            {/*                    </HStack>*/}
            {/*                </Box>*/}
            {/*                <Box flex={1} alignItems={'center'}>*/}
            {/*                    <Text fontWeight={'400'} fontSize={'14'} color='white'*/}
            {/*                          lineHeight={'16.41'}>{getUserInfor?.data?.fullname}</Text>*/}
            {/*                </Box>*/}
            {/*            </HStack>*/}
            {/*        </Box>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <Box m={15}>*/}
            {/*        <Text fontWeight={'500'} fontSize={'12'} color='white'*/}
            {/*              lineHeight={'14.06'}>{t('ParentAccount', {ns: "ServicePage"})}</Text>*/}
            {/*        <HStack justifyContent={'space-between'}>*/}
            {/*            <Text fontWeight={'700'} fontSize={'32'} color='white'*/}
            {/*                  lineHeight={'37.5'}>{getSubscriberAccount?.result?.coreBalance ? String(getSubscriberAccount?.result?.coreBalance)*/}
            {/*                .replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}đ</Text>*/}
            {/*            <Box bg='white' rounded={26.8} alignItems={'center'} onTouchEnd={() => openModal()}>*/}
            {/*                <HStack mx={14} alignItems={'center'}>*/}
            {/*                    <IconWallet/>*/}
            {/*                    <Text ml={3} my={2.5} color='black' fontWeight={'400'} fontSize={'16'}*/}
            {/*                          lineHeight={'18.75'}>{t('Recharge', {ns: "ServicePage"})}</Text>*/}
            {/*                </HStack>*/}
            {/*            </Box>*/}

            {/*        </HStack>*/}
            {/*        <Text fontWeight={'500'} fontSize={'12'} color='white' mt={13}*/}
            {/*              lineHeight={'14.06'}>{t('PromtionalAccount', {ns: "ServicePage"})}</Text>*/}
            {/*        <HStack justifyContent={'space-between'}>*/}
            {/*            <Text fontWeight={'700'} fontSize={'32'} color='white'*/}
            {/*                  lineHeight={'37.5'}>{getSubscriberAccount?.result?.tkkm ? String(getSubscriberAccount?.result?.tkkm)*/}
            {/*                .replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0}đ</Text>*/}
            {/*            <TouchableOpacity onPress={toThongTinTaiKhoan}>*/}
            {/*                <Box bg={colors.light.redBase} rounded={26.8} borderWidth={2}*/}
            {/*                     borderColor={'primaryContrast'}*/}
            {/*                     alignItems={'center'}>*/}
            {/*                    <Text color='white' fontWeight={'400'} fontSize={'16'} lineHeight={'18.75'} mx={25}*/}
            {/*                          my={2}>{t('Search', {ns: "ServicePage"})}</Text>*/}
            {/*                </Box>*/}
            {/*            </TouchableOpacity>*/}

            {/*        </HStack>*/}
            {/*    </Box>*/}
            {/*    <HStack bg={'lightBlue'} px={1}>*/}
            {/*        <Box flex={1} flexDirection='row' justifyContent={'space-between'}>*/}
            {/*            <Box flex={1}>*/}
            {/*                <Box flexDirection='row' mt={1} alignItems={'center'}>*/}
            {/*                    <IconGraph/>*/}
            {/*                    <Text color='white' fontWeight={'400'} ml={1} fontSize={'13'} lineHeight={'22'}*/}
            {/*                    >{t('DataPackage')}</Text>*/}
            {/*                </Box>*/}
            {/*                <Box borderRightColor={'#30A8A5'}>*/}
            {/*                    <Text color='white' maxW={375 / 3} mb={2} mt={1} numberOfLines={1} fontWeight={'600'}*/}
            {/*                          fontSize={'16'}*/}
            {/*                          lineHeight={'20'}*/}
            {/*                    >{mainPackage ? (mainPackage[0]?.serviceCode.length < 7 ? `${mainPackage[0]?.serviceCode}` : (mainPackage[0]?`${mainPackage[0]?.serviceCode?.substring(0, 7)}...`:'')) : ''}</Text>*/}
            {/*                </Box>*/}
            {/*            </Box>*/}

            {/*            <Box flex={1.2} ml={1} alignItems={'center'}>*/}

            {/*                <Box flexDirection='row' alignItems={'center'} mt={1}>*/}
            {/*                    <IconChart/>*/}
            {/*                    <Text numberOfLines={1} color='white' fontWeight={'400'} ml={1} fontSize={'13'}*/}
            {/*                          lineHeight={'22'}*/}
            {/*                    >{t('DataRemaining', {ns: "ServicePage"})}</Text>*/}
            {/*                </Box>*/}
            {/*                <Box alignItems={'center'}>*/}

            {/*                    {*/}
            {/*                        mainPackage?.length !== 0 ?*/}
            {/*                            <Text numberOfLines={1} color='white' maxW={375 / 3} mb={2} mt={1}*/}
            {/*                                  fontWeight={'600'}*/}
            {/*                                  fontSize={'16'}*/}
            {/*                                  lineHeight={'20'}*/}
            {/*                            >{mainPackage ? ((((mainPackage[0]?.dataMain) / 1048576).toFixed(0) + ' MB')) : ''}</Text>*/}
            {/*                            : ''*/}
            {/*                    }*/}
            {/*                </Box>*/}

            {/*            </Box>*/}
            {/*            <Box flex={1} ml={3} alignItems={'center'}>*/}
            {/*                <Text numberOfLines={1} color='white' fontWeight={'400'} fontSize={'13'} mt={1}*/}
            {/*                      lineHeight={'22'}*/}
            {/*                >{width >= 414 ? t('TimeRemaining', {ns: "ServicePage"}) : `${t('TimeRemaining', {ns: "ServicePage"}).substring(0, 10)}...`}</Text>*/}
            {/*                {*/}
            {/*                    mainPackage && mainPackage?.length !== 0 ?*/}
            {/*                        <Text numberOfLines={1} color='white' maxW={375 / 3} mt={1} mb={2}*/}
            {/*                              fontWeight={'600'} fontSize={'16'}*/}
            {/*                              lineHeight={'20'}*/}
            {/*                        >{width >= 414 ? (moment(mainPackage ? mainPackage[0]?.timeEnd : '', COMMON.DATE_FORMAT3).format("DD/MM/YYYY")) : `${(moment(mainPackage ? mainPackage[0]?.timeEnd : '', COMMON.DATE_FORMAT3).format("DD/MM/YYYY")).substring(0, 7)}...`}</Text>*/}
            {/*                        : ''*/}
            {/*                }*/}

            {/*            </Box>*/}
            {/*        </Box>*/}
            {/*    </HStack>*/}

            {/*</Box>*/}
            {/* <TopUpModal modalOpen={modalOpen} setModal={setModal}/> */}
        </>
    )
}
Subcriber087.PropTypes = {
    getUserInfor: PropTypes.object,
    getSubscriberAccount: PropTypes.object
}
export default Subcriber087
