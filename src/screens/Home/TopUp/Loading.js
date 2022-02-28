import React, { useEffect, useState, useCallback, useRef } from 'react';
//UI + Component
import {
    Box, HStack, Modal, Center, useTheme, Icon, VStack,
    Button, Text,
} from "native-base";
import {
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "@/styles/Colors";


//Utils
import { useTranslation } from "react-i18next";

const Loading = React.memo(() => {
    const { t, i18n } = useTranslation(['TopUp', 'Common'], { i18n });
    return (
        <Box flex={1} w={'100%'} alignItems={'center'} justifyContent={'center'}>
            <ActivityIndicator size="large" color="#ED1F24" />
            <Text fontSize={22} fontWeight={'700'} mt={'60px'}>{t("PaymentLoading")}</Text>
        </Box>
    )
})
export default Loading