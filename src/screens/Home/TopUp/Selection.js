import React, { useEffect, useState } from 'react';
//UI + Component
import {
    Box, HStack, Center, useTheme, Icon, VStack,
    Text,
} from "native-base";
import { Header, Input, DialogBoxService } from "@/components";
import { TouchableOpacity, useWindowDimensions, Image, StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "@/styles/Colors";

//API + Context
import { TOPUP } from "@/constants";
import { PaymentProvider, usePayment } from '@/contexts/PaymentContext';
import { useAuth } from '@/contexts';
import { useDispatch } from 'react-redux';
import { SetPaymentInfo } from '@/stores/Payment/PaymentAction';

//Utils
import { useTranslation } from "react-i18next";
import { t } from 'i18next';
import moment from 'moment';
import _ from 'lodash';

const newPrice = [
    {
        id: 1,
        price: '10.000 đ',
        amount: 10000
    },
    {
        id: 2,
        price: '20.000 đ',
        amount: 20000
    },
    {
        id: 3,
        price: '30.000 đ',
        amount: 30000
    },
    {
        id: 4,
        price: '50.000 đ',
        amount: 50000
    },
    {
        id: 5,
        price: '100.000 đ',
        amount: 100000
    },
    {
        id: 6,
        price: '200.000 đ',
        amount: 200000
    },
    {
        id: 7,
        price: '300.000 đ',
        amount: 300000
    },
    {
        id: 8,
        price: '500.000 đ',
        amount: 500000
    },
]

const Selection = ({ setPage }) => {
    // const { paymentInfo, setPaymentInfo } = usePayment();
    const dispatch = useDispatch();
    const { userInfo } = useAuth();
    const { t, i18n } = useTranslation(['TopUp', 'Common'], { i18n });

    const [option, setOption] = useState({});

    const BorderPrice = (id) => option.id == id ? style.selectButtonPrice : style.buttonPrice;
    const TextPriceColor = (id) => option.id == id ? Colors.light.redBase : 'black';

    const ToPaymentMethod = () => {
        if (!userInfo.userData?.user?.phone) DialogBoxService.alert(t("ErrorPhoneNumber"))
        else
            dispatch(SetPaymentInfo({
                price: option.amount,
                phoneRecharge: userInfo.userData?.user?.phone,
                //phoneRecharge: "0902173971",
                service: 'NT', //nạp tiền (topUp)
                providerCode: TOPUP.ITEL_PROVIDER,
                // providerCode: 'TOPUP'
            }))
        setPage(2);


    }
    return (
        <Box flex={1} w={'100%'}>
            <VStack flex={1} alignItems={'center'} justifyContent={'center'} >
                <Text fontSize={18} fontWeight={'700'} lineHeight={'24px'}>{t('SelectPriceTitle', { ns: 'TopUp' })}</Text>
                <Text fontSize={14}>{t('SelectPriceSub', { ns: 'TopUp' })}</Text>

            </VStack>
            <HStack flex={3} paddingX={'5%'} alignItems={'center'} flexWrap={'wrap'} justifyContent={'center'}>
                {
                    newPrice.map((row, index) => (
                        <TouchableOpacity style={BorderPrice(row.id)} onPress={() => setOption(row)}>
                            <Text fontSize={16} fontWeight={'700'} color={TextPriceColor(row.id)}>{row.price}</Text>
                        </TouchableOpacity>
                    ))
                }
            </HStack>
            <VStack flex={1} alignItems={'center'} justifyContent={'center'}>
                <TouchableOpacity style={option.id == undefined ? style.disableButton : style.nextButton} onPress={ToPaymentMethod} disabled={option.id == undefined}>
                    <Text fontSize={16} color={'white'} fontWeight={'600'}>{t('NextButton', { ns: 'Common' })}</Text>
                </TouchableOpacity>
            </VStack>
        </Box>
    )
}
export default Selection
const style = StyleSheet.create({
    buttonPrice: {
        width: '46%', height: 60, borderWidth: 2, borderColor: Colors.light.smoke, borderRadius: 8, margin: 3,
        marginVertical: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
    },
    selectButtonPrice: {
        width: '46%', height: 60, borderWidth: 2, borderColor: Colors.light.redBase, borderRadius: 8, margin: 3,
        marginVertical: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
    },
    nextButton: {
        backgroundColor: Colors.light.redBase, borderRadius: 12, justifyContent: 'center', alignItems: 'center',
        width: '90%', paddingVertical: 10
    },
    disableButton: {
        backgroundColor: Colors.light.smoke, borderRadius: 12, justifyContent: 'center', alignItems: 'center',
        width: '90%', paddingVertical: 10
    }
})