import React, {useEffect} from 'react';
import {registerScreen} from "@/navigators/utils";
import {Box, HStack, Image, Text, useDisclose, useTheme, CloseIcon, Switch, ScrollView} from "native-base";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Actionsheet, Button, Header, Swiper} from "@/components";
import {TouchableOpacity, FlatList, useWindowDimensions} from "react-native";
import {useTranslation} from "react-i18next";
import RenderItemDataPackage from "./RenderItemDataPackage";
import PropTypes from "prop-types";
import BannerDashboard from "@/screens/Home/BannerDashboard";
import {useQuery} from "react-query";
import {useGetAllBanners} from "@/services/Test";
import {CONFIG} from "@/constants";
import _ from "lodash";
import BannerPackage from "@/screens/Home/BuyDataPackage/BannerPackage";

const Name = 'BuyDataPackage'
const ScreenOptions = {
    headerStyle: {backgroundColor: 'white'},
    headerShown: false,
};
const BuyDataPackage = ({route}) => {
    const insets = useSafeAreaInsets();
    const {colors} = useTheme()
    const {t, i18n} = useTranslation(['Common', 'HomePage','Settings'], {i18n});
    const {params} = route;

    return (
        <Box flex={1}>
            <Header isBack={true}  defaultTitle={`${t('BuyPackage', {ns: "Settings",})}`} title={''}/>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <BannerDashboard language={i18n?.language}/>
                <Text mt={10} color={'#3C3C3C'} mx={6} fontWeight={'900'} fontSize={'16px'}
                      lineHeight={'19px'}>  {t('DataForYou', {ns: "Common"})}</Text>
                <Box flex={2} pl={'16px'} pr={'16px'} pt={'16px'}>
                    <FlatList nestedScrollEnabled={true} scrollEnabled={false} showsVerticalScrollIndicator={false} data={params.packages} renderItem={({item}) => <RenderItemDataPackage packageItem={item}/>}/>
                </Box>
            </ScrollView>
        </Box>

    )
}
BuyDataPackage.propTypes = {
    route: PropTypes.any
}
export default registerScreen(Name, BuyDataPackage, ScreenOptions);

