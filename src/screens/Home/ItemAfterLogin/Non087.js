import React from 'react'
import {Box, HStack, Image, Text, useTheme} from "native-base";
import {TouchableOpacity, useWindowDimensions} from "react-native";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useAuth} from "@/contexts";

// eslint-disable-next-line react/prop-types
const Non087 =()=>{
    const {colors} = useTheme();
    const {height, width} = useWindowDimensions();
    const {t, i18n} = useTranslation(['HomePage', ['ServicePage'], 'Common'], {i18n});
    const {userInfo, setUserInfo} = useAuth();

    return(
        <Box>
            <Box bg={'redPlum'} m={4} rounded={4}>
                <HStack my={4}>
                    <Box alignItems={'center'} flex={1}>
                        <HStack alignItems={'center'}>
                            <Image source={require('../../../assets/images/phone.png')}/>
                            <Text ml={3} color='white' fontWeight={'700'} fontSize={'16'}
                                  lineHeight={'18.75'}>{userInfo?.userData?.user?.userName}</Text>
                        </HStack>
                    </Box>
                </HStack>
            </Box>
        </Box>
    )
}
Non087.PropTypes={
    getUserInfor: PropTypes.object,
    getSubscriberAccount: PropTypes.object
}
export default Non087
