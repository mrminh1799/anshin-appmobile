import React from 'react'
import {Box, HStack, Image, Text, useTheme} from "native-base";
import {TouchableOpacity, useWindowDimensions} from "react-native";
import {useTranslation} from "react-i18next";
import {Button} from "@/components";
import Logo from "../../../assets/icons/iconSVG/lauchlogo.svg"

import {useAuth} from "@/contexts";


const Guest =()=>{
    const {colors} = useTheme();
    const {height, width} = useWindowDimensions();
    const {t, i18n} = useTranslation(['HomePage'], {i18n});
    const {userInfo, setUserInfo} = useAuth();
    const toLogin=()=>{
        setUserInfo(null)
    }

    return(
        <Box>
            <Box alignItems={'center'} >
                <Box alignItems={'center'}  mb={'16px'}>
                    <Button
                            borderRadius={26}
                            height={48}
                            width={width-32}
                            style={{height: 48, width: 148, borderRadius: 26}}
                            backgroundColor={'white'}
                            onPress={toLogin}
                    >
                        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>{t('Login',{ns:"HomePage"})}</Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default Guest
