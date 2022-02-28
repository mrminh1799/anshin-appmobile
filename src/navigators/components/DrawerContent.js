import React, {useState} from 'react';
//UI + Component
import {Alert, TouchableOpacity} from 'react-native';
import {Box, Center, Text, VStack, Icon, useTheme, HStack, Divider, Image, ScrollView} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from "@/styles/Colors";
import DeviceInfo from "react-native-device-info";
//Utils
import {useTranslation} from "react-i18next";
import {navigate} from '@/navigators/utils';
import ChangeLanguage from "@/screens/ChangeLanguage";
import Keychain from "react-native-keychain";
import {useAuth} from "@/contexts";
import PropTypes from "prop-types";
import {DialogBoxService} from "@/components";
import Storage from "@/utils/Storage";
import {COMMON} from "@/constants";
import {useGetAllChargePackages} from "@/services/PackageTel";

import IconQLTK from "../../assets/icons/iconSVG/perm_identity_24px.svg"
import IconLSTD from "../../assets/icons/iconSVG/bagmenu.svg"
import IconNT from "../../assets/icons/iconSVG/account_balance_wallet_24px.svg"
import IconGame from "../../assets/icons/iconSVG/menugame.svg"
import IconCinema from "../../assets/icons/iconSVG/cinemamenu.svg"
import IconNews from "../../assets/icons/iconSVG/Bookmark_light.svg"
import IconUuDai from "../../assets/icons/iconSVG/monetization_on_24px.svg"
import IconLib from "../../assets/icons/iconSVG/bar-chart-2.svg"
import IconTTHT from "../../assets/icons/iconSVG/Vector.svg"
import IconDGCL from "../../assets/icons/iconSVG/toggle_on_24px.svg"
import IconLogout from "../../assets/icons/iconSVG/logout.svg"
import IconBCT from "../../assets/icons/iconSVG/bcct.svg"


const DrawerContent = ({navigation}) => {
    const {t, i18n} = useTranslation(['Settings'], {i18n});
    const insets = useSafeAreaInsets();
    const [open, setOpen] = useState(false);//mục quản lý tài khoản
    const [openLanguage, setLanguage] = useState(false)//mục đổi ngôn ngữ
    const {userInfo, setUserInfo} = useAuth();



    const logOutApp = async () => {
        await Storage.delete(COMMON.ACCESS_TOKEN_GG)
        navigation.closeDrawer();
        await Keychain.resetGenericPassword()
        setUserInfo(null)
    }


    return (
        <Center flex={1} bg={'#222428'}>
            <ScrollView h='100%' w='88%' style={{marginTop: insets.top}} showsVerticalScrollIndicator={false}>
                <VStack py={'10px'}>
                    <TouchableOpacity onPress={() => setOpen(!open)}>
                        <HStack my={2} alignItems={'center'}>
                            <Center w={'25px'} h={'25px'}>
                                <IconQLTK/>
                            </Center>
                            <Text color={'white'} ml={'20px'} fontSize={14}>{t('AccountMng')}</Text>
                            <Icon as={open ? <AntDesign name="up"/> : <AntDesign name="down"/>} size={'4'}
                                  color={'white'}
                                  position={'absolute'} right={"0"}/>
                        </HStack>
                    </TouchableOpacity>

                    {open && <VStack py={'5px'}>
                        <TouchableOpacity>
                            <HStack my={2} pl={'15px'} alignItems={'center'}>
                                <Icon as={<AntDesign name="user"/>} size={'20px'} color={'white'}/>
                                <Text color={'white'} ml={'20px'} fontSize={14}>{t('MobileInfo')}</Text>
                            </HStack>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <HStack my={2} pl={'15px'} alignItems={'center'}>
                                <Icon as={<AntDesign name="user"/>} size={'20px'} color={'white'}/>
                                <Text color={'white'} ml={'20px'} fontSize={14}>{t('AccInfo')}</Text>
                            </HStack>
                        </TouchableOpacity>
                    </VStack>}
                </VStack>

                <Divider my={2}/>
                <VStack py={'10px'}>
                    <TouchableOpacity onPress={() => setLanguage(!openLanguage)}>
                        <HStack my={2} alignItems={'center'}>
                            <Center w={'25px'} h={'25px'}>
                                <IconQLTK/>
                            </Center>
                            <Text color={'white'} ml={'20px'} fontSize={14}>{t('ChangeLanguage')}</Text>
                            <Icon as={openLanguage ? <AntDesign name="up"/> : <AntDesign name="down"/>} size={'4'}
                                  color={'white'}
                                  position={'absolute'} right={"0"}/>
                        </HStack>
                    </TouchableOpacity>
                    {openLanguage && <Box py={'5px'}>
                        <ChangeLanguage/>
                    </Box>}
                    <TouchableOpacity onPress={logOutApp}>
                        <HStack my={2} alignItems={'center'}>
                            <Center w={'25px'} h={'25px'}>
                                <IconLogout/>
                            </Center>
                            <Text color={'white'} ml={'20px'} fontSize={14}>{t('LogOut')}</Text>
                        </HStack>
                    </TouchableOpacity>
                    <Text color={'white'} mt={'25px'}
                          fontSize={14}>{t('Version') + ":  " + DeviceInfo.getVersion()}</Text>
                    <IconBCT/>
                    <Box h={'20px'}/>
                </VStack>
            </ScrollView>
        </Center>
    )
}
DrawerContent.propTypes = {
    navigation: PropTypes.func
}
export default DrawerContent
