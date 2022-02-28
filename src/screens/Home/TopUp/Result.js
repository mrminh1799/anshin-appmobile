import React, { useEffect, useState, useRef } from 'react';
//UI + Component
import {
    Box, HStack, Center, useTheme, VStack, Text,
} from "native-base";
import { Header, Input } from "@/components";
import { TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "@/styles/Colors";

//API + Context
import { PaymentProvider, usePayment } from '@/contexts/PaymentContext';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { ClearVnPay } from '@/stores/Notification/NotificationAction';
import { ResetPayment } from '@/stores/Payment/PaymentAction';

//Utils
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts";
import moment from 'moment';

const PaymentSelector = createSelector(
    state => state.PaymentReducer,
    payment => payment
)

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const Result = React.memo(({ setPage }) => {
    const { t, i18n } = useTranslation(['TopUpResult'], { i18n });
    const payInfo = useSelector(PaymentSelector);

    var FailMsg = () => {
        if (payInfo?.resultCode == -1) return t('UserCancel')
        else if (payInfo?.resultCode == 20) return t("PaymentFail")
        else if (payInfo?.resultCode == 12) return payInfo.paymentResult?.debtDesc
        else return ''
    }
    const isSuccess = [97, 99].includes(payInfo?.resultCode);
    return (
        <Box flex={1} width={SCREEN_WIDTH} alignItems={'center'} px={'5%'} >
            {isSuccess ? <Success setPage={setPage} payInfo={payInfo} /> :
                <FailPage subtitle={FailMsg()} setPage={setPage} />}
        </Box>
    )
})

const Success = React.memo(({ setPage, payInfo }) => {
    const { paymentResult } = payInfo;
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation(['TopUpResult'], { i18n });

    const providerTitle = payInfo.providerCode == 'TOPUP' ? payInfo.providerCode : "Nạp thẻ";
    const paymentTime = moment(Number(paymentResult?.debtReqId)).format('HH:mm:ss - DD/MM/YYYY');

    return (
        <>
            <Center mt={'50px'}>
                <Image source={require('@/assets/images/icon__check__red.png')} style={{ width: 50, height: 50 }} />
                <Text fontSize={22} fontWeight={'700'} marginTop={'10px'}>{t('SuccessTitle')}</Text>
            </Center>
            <Text fontSize={20} marginTop={'50px'} textAlign={'center'}>{t('TopUpSuccess', { price: payInfo.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ' })}</Text>
            <Box position={'absolute'} bottom={'10px'} w={'100%'} >
                <TouchableOpacity style={style.nextButton} onPress={() => {
                    setPage(1);
                    dispatch(ClearVnPay());
                    setTimeout(() => dispatch(ResetPayment()), 750);

                }} >
                    <Text fontSize={16} color={'white'} fontWeight={'600'}>{t("AnotherTrans")}</Text>
                </TouchableOpacity>
            </Box>

        </>
    )
})

const FailPage = React.memo(({ subtitle, setPage }) => {
    const { t, i18n } = useTranslation(['TopUpResult'], { i18n });
    const dispatch = useDispatch();
    return (
        <VStack flex={1} alignItems={'center'} px={'8%'}>
            <Image source={require('@/assets/images/topup/x-circle.png')} style={{ marginTop: '10%' }} />
            <Text fontSize={24} fontWeight={'700'} lineHeight={'40px'}>{t('FailTitle')}</Text>
            <Text fontSize={16} fontWeight={'normal'} lineHeight={'25px'} textAlign={'center'}>{subtitle}</Text>
            <TouchableOpacity style={style.bottomButton} onPress={() => {
                setPage(1);
                dispatch(ClearVnPay());
                setTimeout(() => dispatch(ResetPayment()), 750);
            }} >
                <Text fontSize={16} color={'white'} fontWeight={'600'}>{t("AnotherTrans")}</Text>
            </TouchableOpacity>
        </VStack>
    )
})

export default Result
const style = StyleSheet.create({
    nextButton: {
        backgroundColor: Colors.light.redBase, borderRadius: 18, justifyContent: 'center', alignItems: 'center',
        width: '100%', paddingVertical: 10, marginBottom: 15
    },
    bottomButton: {
        backgroundColor: Colors.light.redBase, borderRadius: 18, justifyContent: 'center', alignItems: 'center',
        width: '100%', paddingVertical: 10, position: 'absolute', bottom: 15
    }
})