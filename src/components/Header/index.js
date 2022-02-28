import React, {useState} from 'react';
import {HStack, Button, ChevronLeftIcon, Text, Box, useTheme} from 'native-base'
import PropsType from "prop-types";
// import trans from "translations/trans";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {goBack} from "@/navigators/utils";
import {Image, useWindowDimensions, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {isIphoneX} from "@/utils/Other";

const HeaderComponent = ({
                             check, title, defaultTitle, isBack = true, backPress, icon, ...props
                         }) => {
    const {width, height} = useWindowDimensions();
    const {colors} = useTheme();
    const insets = useSafeAreaInsets();
    const {t, i18n} = useTranslation(['HomePage'], {i18n});
    const [textSize, setTextSize] = useState([])
    return (
        <HStack
            {...props}
            px={0}
            py={4}
            style={{paddingTop: isIphoneX() ? insets.top : 10}}
            w={'100%'}
            bg={check ? 'white' : 'redBase'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            {
                isBack && <Box position={'absolute'} top={isIphoneX() ? insets.top : "10px"} left={'5px'}>
                    <TouchableOpacity onPress={() => {
                        backPress ? backPress() : goBack()
                    }} bg="transparent">
                        <ChevronLeftIcon color={check ? '#151522' : 'white'} size="8"/>
                    </TouchableOpacity>
                </Box>
            }
            <Box alignItems={'center'} flexDir={'row'} justifyContent={"center"}>
                {
                    !!icon &&
                    <Image style={{
                        height: textSize?.height ? textSize.height : 22,
                        width: '20%',
                        resizeMode: "contain"
                    }} source={icon}/>
                }
                <Text
                    onLayout={(event) => {
                        setTextSize(event.nativeEvent.layout)
                    }}
                    textAlign={"center"}
                    fontSize={17}
                    color={check ? '#151522' : 'white'}
                    lineHeight={22} maxW={width * 0.7}
                    fontWeight={"700"}>
                    {title ? t(title) : defaultTitle}
                </Text>
            </Box>
        </HStack>
    )
}

HeaderComponent.propTypes = {
    backPress: PropsType.func,
    title: PropsType.string.isRequired,
    isBack: PropsType.bool.isRequired,
    defaultTitle: PropsType.string
}

export default HeaderComponent
