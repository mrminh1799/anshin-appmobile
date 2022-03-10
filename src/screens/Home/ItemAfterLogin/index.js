import React, {useEffect, useRef, useState} from 'react';
import {Box, HStack, Image} from "native-base";
import {TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import { navigate} from "@/navigators/utils";
import {useAuth} from "@/contexts";
import Subcriber087 from "@/screens/Home/ItemAfterLogin/Subcriber087";
import SocialNetwork from "@/screens/Home/ItemAfterLogin/SocialNetwork";
import Guest from "@/screens/Home/ItemAfterLogin/Guest";
import PropTypes from "prop-types";
import Non087 from "@/screens/Home/ItemAfterLogin/Non087";

import IconBell from "../../../assets/icons/iconSVG/bell.svg"
import IconMenu from "../../../assets/icons/iconSVG/menu.svg"

const ItemAfterLogin = ({currentPackage, getUserInfor, getSubscriberAccount, openDrawer}) => {
    const {userInfo} = useAuth();
    const {t, i18n} = useTranslation(['HomePage', ['ServicePage'], 'Common', 'TopUp'], {i18n});


    const toNewsItel = () => {
        navigate('NewsItel')
    }
    const toNotification = () => {
        navigate('Notification')
    }

    return (
        <Box>
            <HStack justifyContent={'space-between'} mx={17}>
                <Box>
                    <TouchableOpacity onPress={toNotification}
                                      style={{padding: 5, borderRadius: 100}}>
                      <IconBell/>
                    </TouchableOpacity>
                </Box>
                <Box>
                    <TouchableOpacity onPress={openDrawer}
                                      style={{padding: 5, borderRadius: 100}}>
                       <IconMenu/>
                    </TouchableOpacity>
                </Box>
            </HStack>
            <Guest/>
            {/*{*/}
            {/*    (userInfo?.userData?.groupAppCode === 'NON087' && userInfo?.userData?.current?.userType !== 'NON_ITEL') ?*/}
            {/*        <SocialNetwork*/}
            {/*            userInfo={userInfo}/> : (userInfo?.userData?.groupAppCode === '087' || userInfo?.userData?.groupAppCode === 'LK087' ?*/}
            {/*            <Subcriber087 getUserInfor={getUserInfor}*/}
            {/*                          currentPackage={currentPackage}*/}
            {/*                          getSubscriberAccount={getSubscriberAccount}/> : (userInfo?.userData?.current?.userType === 'NON_ITEL' ?*/}
            {/*                <Non087/> : <Guest/>)*/}
            {/*        )*/}
            {/*}*/}
        </Box>

    )
}
ItemAfterLogin.PropTypes =
    {
        getUserInfor: PropTypes.object,
        getSubscriberAccount: PropTypes.object
    }
export default ItemAfterLogin
