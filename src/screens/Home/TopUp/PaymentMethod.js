import React, { useEffect, useState, useCallback, useRef } from 'react';
//UI + Component
import {
    Box, HStack, Modal, Center, useTheme, Icon, VStack,
    Button, Text, ArrowBackIcon
} from "native-base";
import {
    TouchableOpacity,
    useWindowDimensions,
    Image,
    NativeEventEmitter,
    StyleSheet,
    Linking,
    Platform
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "@/styles/Colors";
import { DialogBoxService } from "@/components";

//API + Context
import { PaymentProvider, usePayment } from '@/contexts/PaymentContext';
import { useGetPaymentUrl } from '@/services/VNPay';
import { SetPaymentInfo, ResetPayment } from '@/stores/Payment/PaymentAction';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect'
import { ClearVnPay } from '@/stores/Notification/NotificationAction';
//Utils
import { useTranslation } from "react-i18next";
import { t } from 'i18next';
import moment from 'moment';
import _ from 'lodash';
import publicIP from 'react-native-public-ip';
import { registerScreen, navigate, goBack } from "@/navigators/utils";

//Payment
import VnpayMerchant, { VnpayMerchantModule } from 'react-native-vnpay-merchant';

const EventEmitter = new NativeEventEmitter(VnpayMerchantModule);
const VNPayNotiSelector = createSelector(
    state => state.NotificationReducer.VNPayNoti,
    noti => noti
)
const PaymentSelector = createSelector(
    state => state.PaymentReducer,
    payment => payment
)

const PaymentMethod = React.memo(({ setPage }) => {
    const { t, i18n } = useTranslation(['TopUp', 'Common', 'Settings'], { i18n });
    const paymentResult = useSelector(VNPayNotiSelector);//noti tra ve
    const payInfo = useSelector(PaymentSelector);//data local

    const paymentRef = useRef(paymentResult);
    const dispatch = useDispatch();

    // const [disableNext, setDisableNext] = useState(true);//disable button tiep tuc
    let timerLoading = null;
    const [ip, setIp] = useState('');
    const { status, error, value, refetch } = useGetPaymentUrl(payInfo);
    const [method, setMethod] = useState(null);

    const onBack = () => {//khi nhan button quay lai
        setPage(1);
    }
    const VnPayPress = () => {//chọn button VNPay
        setPage(3);
        refetch();
    }
    const HandlePaymentVNPay = () => {
        VnpayMerchant.show({
            "isSandbox": false,
            "scheme": "com.itel.myitel",
            "title": "Thanh toán VNPAY",
            "titleColor": "#ffffff",
            "beginColor": "#ED1F24",
            "endColor": "#ED1F24",
            "tmn_code": "ITEL0002",
            "paymentUrl": value.payUrl
        })
    }

    useEffect(() => {
        if (value?.payUrl) {
            //console.log("PayUrl -------> " + JSON.stringify(value));
            dispatch(SetPaymentInfo({
                method,
                txnRef: value.txnRef,
                reqId: value.reqId,
                paymentLoading: true
            }));
            HandlePaymentVNPay();
            // mở webview vnpay khi trả về url payment thành công
        }
    }, [value])
    useEffect(() => {
        const HandlePaymentNoti = () => {//trường hợp noti bắn về app khi đang foreground
            if (paymentResult) {
                dispatch(SetPaymentInfo({
                    paymentLoading: false
                }))
                let resultCode = 97;
                if (paymentResult.debtStatus == 0) resultCode = 20
                else if (paymentResult.debtStatus != 1) resultCode = 12
                //console.log("Ket qua àdfafdasfsdsaf -------------> " + JSON.stringify(paymentResult));
                dispatch(SetPaymentInfo({ resultCode, paymentResult }));
                setPage(0);
            }
        }

        HandlePaymentNoti();
        Linking.addEventListener('url', (url) => {// xử lý trường hợp app ví back về app itel
            if (url.url?.includes("com.itel.myitel")) {
                if (!paymentResult) timerLoading = setTimeout(() => dispatch(SetPaymentInfo({
                    paymentLoading: false
                })), 12000)
                HandlePaymentNoti();
            }
        });
        // lưu ý: hiện tại nếu user nạp tiền vào ví thành công -> noti bắn về trước khi user quay lại app thì khả năng HandlePaymentNoti() bị gọi 2 lần
        //đang tìm cách khắc phục

        EventEmitter.addListener('PaymentBack', (e) => {//xử lý trường hợp webview back về app
            if (e) {
                // console.log("Code ------------> " + e.resultCode);
                switch (e.resultCode) {
                    case -1:
                    case 98:
                        dispatch(SetPaymentInfo({ resultCode: e.resultCode }));
                        setPage(0);
                        break;
                    case 99:
                    case 97:
                        if (!paymentResult) timerLoading = setTimeout(() => dispatch(SetPaymentInfo({
                            paymentLoading: false
                        })), 12000)
                        break;
                    case 10:
                        break;
                    default:
                        break;
                }
            }
        })
        return () => {
            Linking.removeAllListeners('url');
            EventEmitter.removeAllListeners('PaymentBack');
            if (timerLoading) clearTimeout(timerLoading)
        }
    }, [paymentResult])

    return (
        <Box flex={1} w={'100%'} alignItems={'center'}>
            <TouchableOpacity style={{ position: 'absolute', top: 5, left: 5, padding: 10 }} onPress={onBack}>
                <Box p={'10px'} borderWidth={2} borderRadius={60} borderColor={'redBase'}>
                    <ArrowBackIcon size={'10px'} color={'redBase'} />
                </Box>
            </TouchableOpacity>
            <VStack py={'15px'} mt={'45px'} alignItems={'center'} justifyContent={'center'} w={'100%'}>
                <Text fontSize={20} fontWeight={'700'} mt={'20px'}>{t('Title', { ns: 'TopUp' })}</Text>
                <Text fontSize={14}>{t("Subtitle", { ns: 'TopUp' })}</Text>
            </VStack>
            <VStack w={'90%'} h={'50%'} mt={'15px'} rounded={10} px={'5%'}>
                {/* <HStack alignItems={'center'} my={'20px'}>
                    <Image source={require('@/assets/images/topup/CardIcon1x.png')} ml={'15px'} />
                    <Text fontSize={14} fontWeight={'700'} ml={'10px'}>{t("WalletOpt", { ns: 'TopUp' })}</Text>
                </HStack> */}
                <HStack alignItems={'flex-start'} >
                    <Box flex={1} h={'120px'} mr={'5px'} rounded={8} borderWidth={2}
                        borderColor={method == "VNPay" ? 'redBase' : Colors.light.smoke}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setMethod("VNPay");
                                VnPayPress();
                            }}>
                            <Image source={require('@/assets/images/topup/LogoVNPAY_1x.png')} />
                        </TouchableOpacity>
                    </Box>
                    <Box flex={1} h={'120px'} ml={'5px'} rounded={8} borderWidth={2}
                        borderColor={method == 'Momo' ? 'redBase' : Colors.light.smoke}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setMethod("Momo");

                            }}>
                            <Image source={require('@/assets/images/topup/LogoMomo_1x.png')} />
                        </TouchableOpacity>
                    </Box>
                </HStack>
                {
                    (method == 'Momo') && <Text fontSize={14} color={'redBase'} fontWeight={'700'} alignSelf={'center'}
                        textAlign={'center'} w={'100%'} mt={'20px'}>{t('functiondevelopment', { ns: 'Settings' })}</Text>
                }
            </VStack>
            {/* <HStack w={'94%'} height={'10%'} position={'absolute'} bottom={'20px'}>
                <TouchableOpacity style={style.nextButton} onPress={onBack} >
                    <Text fontSize={16} color={'white'} fontWeight={'600'}>{t('BackButton', { ns: 'Common' })}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={disableNext ? style.disableButton : style.nextButton} onPress={onNext} disabled={disableNext}>
                    <Text fontSize={16} color={'white'} fontWeight={'600'}>{t('NextButton', { ns: 'Common' })}</Text>
                </TouchableOpacity>
            </HStack> */}
        </Box >
    )
})
export default PaymentMethod

const style = StyleSheet.create({
    backButton: {
        position: 'absolute', height: 40, width: 40, top: 10, left: 15, backgroundColor: Colors.light.smoke,
        justifyContent: 'center', alignItems: 'center', borderRadius: 60
    },
    nextButton: {
        backgroundColor: Colors.light.redBase, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
        flex: 1, marginHorizontal: 4
    },
    disableButton: {
        backgroundColor: Colors.light.smoke, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
        flex: 1, marginHorizontal: 4
    }
})
