import React from 'react'
import {Box, HStack, Text, useTheme} from "native-base";
import {TouchableOpacity, Image, useWindowDimensions} from "react-native";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useAuth} from "@/contexts";


const SocialNetwork = () => {
    const {userInfo, setUserInfo} = useAuth();
    const {colors} = useTheme();
    const {height, width} = useWindowDimensions();
    const {t, i18n} = useTranslation(['HomePage', ['ServicePage'], 'Common'], {i18n});
    const avatarFB = 'https://graph.facebook.com/' + userInfo?.userData?.current?.userName + '/picture?type=large'

    const renderAvatar = () => {
        if (userInfo?.userData?.current?.userType === 'FB') {
            return (<Image style={{height: height / 15, width: width / 7, borderRadius: 50}}
                           source={{
                               cache: 'reload',
                               uri: avatarFB
                           }}/>)
        } else {
            return <Image h={height / 15} w={width / 7}
                          source={require('../../../assets/icons/iconuser.png')}/>
        }
    }
    return (
        <Box>
            <Box alignItems={'center'}>
                {renderAvatar()}
                <Text my={3} fontWeight={'900'} fontSize={'16'} lineHeight={19}
                      color='white'>{userInfo?.userData?.current?.fullName !== null ? userInfo?.userData?.current?.fullName : userInfo?.userData?.current?.userName}</Text>
            </Box>
        </Box>
    )
}
SocialNetwork.PropTypes = {
    userInfo: PropTypes.object
}
export default SocialNetwork
