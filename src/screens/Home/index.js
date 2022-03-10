import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, HStack, Text, useTheme, Image} from "native-base";
import {useWindowDimensions, ScrollView, TouchableOpacity, Platform, RefreshControl, FlatList} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
/*Import component*/
import {navigate, registerScreen, tabBarRef} from '@/navigators/utils';
import ItemAfterLogin from "@/screens/Home/ItemAfterLogin/index";
import {useAuth} from "@/contexts";
import PropTypes from "prop-types";
import ProductCard from "@/screens/Home/Product/ProductCard";
import {useGetAllProducts} from "@/services/Product";


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
    const allProducts = useGetAllProducts({
        currenPage: 1,
        sizePage: 10

    })

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
                        <Image style={{height:150}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/anshin-b910b.appspot.com/o/sale50%25.jpg?alt=media&token=e5503710-23f7-472c-b530-5b017bd0f93f"}}/>
                     <Box alignItems={'center'} >
                         <FlatList
                             scrollEnabled={false}
                             nestedScrollEnabled={false}
                             numColumns={2}
                             showsVerticalScrollIndicator={false}
                             showsHorizontalScrollIndicator={false}
                             keyExtractor={(item, index) => index}
                             data={allProducts?.data}
                             renderItem={(item) => <ProductCard
                                 item={item?.item}
                             />}/>

                     </Box>

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
