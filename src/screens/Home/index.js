import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, HStack, Text, useTheme, Image} from "native-base";
import {useWindowDimensions, ScrollView, TouchableOpacity, Platform, RefreshControl} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
/*Import component*/
import {navigate, registerScreen, tabBarRef} from '@/navigators/utils';
import {
    useGetBlacklist,
    useGetCurrentPackage,
    useGetSubscriberBalance, useGetUserInfor,
} from '@/services/Test';
import ItemAfterLogin from "@/screens/Home/ItemAfterLogin/index";
import BannerDashboard from "@/screens/Home/BannerDashboard";

import {useAuth} from "@/contexts";
import PropTypes from "prop-types";
import {DialogBoxService} from "@/components";
import {useGetAllChargePackages} from "@/services/PackageTel";
import IconSim from "../../assets/icons/iconSVG/simso.svg"
import IconCNTTB from "../../assets/icons/iconSVG/cnttb.svg"
import IconGame from "../../assets/icons/iconSVG/itel-game.svg"
import IconCinema from "../../assets/icons/iconSVG/cinema.svg"
import IconUlitity from "../../assets/icons/iconSVG/simso.svg"
import IconShopping from "../../assets/icons/iconSVG/muasam.svg"
import IconBank from "../../assets/icons/iconSVG/nganhang.svg"
import IconTienIch from "../../assets/icons/iconSVG/tienichkhac.svg"


const Name = 'CoopHome';

const ScreenOptions = {
    headerTitle: 'CoopHome',
    headerShown: false,
};

const CoopHome = ({navigation}) => {
    const {colors} = useTheme();
    const insets = useSafeAreaInsets();
    const {height, width} = useWindowDimensions();
    const {t, i18n} = useTranslation(['Footer', 'ServicePage', 'Settings'], {i18n});
    const {userInfo, setUserInfo} = useAuth();
    const [hideButton, setHideButton] = useState(true)
    const [oldOffset, setOldOffset] = useState(null)
    const [maxOldOffset, setMaxOldOffset] = useState(null)
    //refresh api when scroll down
    const [refreshing, setRefreshing] = React.useState(false);


    //callback when reload success
    const onRefresh = React.useCallback(() => {
        setRefreshing(false);
    }, []);

    //check thue bao blacklist


    const openDrawer = () => {
        tabBarRef.current.hideTabBar();
        navigation.openDrawer();
    }


    const handleHideBar = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        setOldOffset(currentOffset);
        if (!(currentOffset < 0) && currentOffset !== 0) {
            if (currentOffset < oldOffset) {
                tabBarRef.current.showTabBar();
            } else {
                tabBarRef.current.hideTabBar();
            }
        }
    }

    return (
        <Box flex={1} pt={Platform.OS === "ios" ? 10 : 0} bg="#222428">
            <ItemAfterLogin
                openDrawer={openDrawer}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={handleHideBar}
                onScrollEndDrag={event => {
                    setMaxOldOffset(event.nativeEvent.contentOffset.y);
                }}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsHorizontalScrollIndicator={false}
            >
                <Box flex={1} bg={'white'}>
                    <Box mb={insets.bottom}>
                        {/*renderBanner*/}
                        <BannerDashboard language={i18n?.language}/>
                        {/*renderOption*/}


                    </Box>
                </Box>

            </ScrollView>
        </Box>
    );
};
CoopHome.propTypes = {
    navigation: PropTypes.any
}
export default registerScreen(Name, CoopHome, ScreenOptions);
