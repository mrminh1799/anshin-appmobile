import React from 'react';
import {Box, Image, ScrollView, Text} from "native-base";
import {registerScreen} from "@/navigators/utils";
import {Button, Header} from "@/components";
import {useWindowDimensions} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Name = 'ProductDetail';

const ScreenOptions = {
    headerTitle: 'CoopHome',
    headerShown: false,
};
const ProductDetail = ({route}) => {
    const {params} = route
    console.log('2222', params?.data?.data)
    const insets = useSafeAreaInsets();
    const {height, width} = useWindowDimensions();

    return (
        <Box flex={1} mb={insets.bottom}>
            <Header isBack={true} defaultTitle={'Chi tiết sản phẩm'} title={''}/>
            <ScrollView  showsVerticalScrollIndicator={false}
                         showsHorizontalScrollIndicator={false}>
                <Box alignItems={'center'}>
                    <Box alignItems={'center'}>
                        <Image style={{
                            width: width,
                            height: 140,
                            // resizeMode: 'contain',
                        }}
                               source={{uri: "https://firebasestorage.googleapis.com/v0/b/anshin-b910b.appspot.com/o/sale50%25.jpg?alt=media&token=e5503710-23f7-472c-b530-5b017bd0f93f"}}/>
                        <Text fontWeight={'700'} mt={4}>{params?.data?.data?.name}</Text>
                    </Box>
                    <Text mx={4} numberOfLines={60} fontWeight={'700'} mt={4}>{params?.data?.data?.description}</Text>
                    <Text mx={4} fontWeight={'700'} mt={4}>Giá: {params?.data?.data?.price}</Text>
                    <Box mt={8} height={'10'} rounded={12} width={'140'} bg={'#222428'} justifyContent={'center'}>
                        <Button><Text mx={2} fontWeight={'700'} color={'white'}>Thêm vào giỏ hàng</Text></Button>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    )
}
export default registerScreen(Name, ProductDetail, ScreenOptions);
