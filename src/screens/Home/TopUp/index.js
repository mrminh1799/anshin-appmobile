import React, { useEffect, useState, useCallback, useRef } from 'react';
//UI + Component
import {
    Box, HStack, Modal, Center, useTheme, Icon, VStack,
    Button, Text, CloseIcon
} from "native-base";
import {
    TouchableOpacity,
    useWindowDimensions,
    Image,
    NativeEventEmitter,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "@/styles/Colors";
import Selection from './Selection';
import PaymentMethod from './PaymentMethod';
import Result from './Result';
import Loading from './Loading';
import { Swiper, SwiperBanner } from "@/components";

//API + Context
import { PaymentProvider, usePayment } from '@/contexts/PaymentContext';
import { ResetPayment } from '@/stores/Payment/PaymentAction';
import { ClearVnPay } from '@/stores/Notification/NotificationAction';
import { createSelector } from 'reselect'
//Utils
import { useTranslation } from "react-i18next";
import { usePrevious } from '@/utils/Other';

//Payment
import VnpayMerchant, { VnpayMerchantModule } from 'react-native-vnpay-merchant';
import { goBack, registerScreen } from "@/navigators/utils";
import { useDispatch, useSelector } from 'react-redux';

const EventEmitter = new NativeEventEmitter(VnpayMerchantModule);
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Name = 'TopUpModal';
const ScreenOptions = {
    headerTitle: 'TopUpModal',
    headerShown: false,
};
const PaymentSelector = createSelector(
    state => state.PaymentReducer,
    payment => payment
)

const TopUpModal = () => {
    const { t, i18n } = useTranslation(['TopUp'], { i18n });
    const dispatch = useDispatch();
    const payInfo = useSelector(PaymentSelector);//data local

    const [curPage, setPage] = useState(0);// đánh số page(step)

    const resetStateOnClose = () => {
        // if (!payInfo.paymentLoading) {
        //     dispatch(ResetPayment());
        //     dispatch(ClearVnPay());
        //     goBack();
        // }
        dispatch(ResetPayment());
        dispatch(ClearVnPay());
        goBack();
    }

    useEffect(() => {
        console.log("Curr Page: " + curPage);
        // console.log("Prev page: " + prevPage);
        // if (swipeRef?.current) {
        //     if (prevPage == 2) swipeRef.current.scrollBy(1)
        //     else if (prevPage < curPage) swipeRef.current.scrollBy(1)
        //     else if (prevPage > curPage) {
        //         console.log("ANnananaa")
        //         swipeRef.current.scrollBy(-1)
        //     }
        // }
    }, [curPage])

    useEffect(() => {
        dispatch(ClearVnPay());
        dispatch(ResetPayment());
    }, [])

    return (
        <Box flex={1}>
            <Box flex={3} opacity={0.3} bg={'#000'} onTouchEnd={resetStateOnClose} />
            <Box flex={7} bg={'white'}>
                <Swiper autoplay={false} showsPagination={false} index={curPage}
                    scrollEnabled={false}
                    loop={true}>
                    <Selection setPage={setPage} />
                    <PaymentMethod setPage={setPage} />
                    <Loading />
                    <Result setPage={setPage} />
                </Swiper>
                <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5, padding: 10 }} onPress={resetStateOnClose}>
                    <Box p={'10px'} borderWidth={2} borderRadius={60} borderColor={'redBase'}>
                        <CloseIcon size={'10px'} color={'redBase'} />
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    )
}

export default registerScreen(Name, TopUpModal, ScreenOptions)
