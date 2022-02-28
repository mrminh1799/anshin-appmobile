import React, {useEffect, useRef, useState} from 'react';
import {Box, useTheme, Icon, Image, Text, HStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input, Button, DialogBoxService, SelectInput} from '@/components';
import {registerScreen} from '@/navigators/utils';
import LoginLogo from '@/assets/images/logo-red.svg';
import {TouchableWithoutFeedback, Keyboard, AppState, useWindowDimensions} from 'react-native';
import {useAuth} from '@/contexts';
import * as DeviceInfo from "react-native-device-info";
import {useGuestLogin} from "@/services/GuestLogin";
import Keychain from "react-native-keychain";
import Storage from "../../utils/Storage"
import {useLoginLTE, useRequestOtpLogin, useVerifyOtpLogin} from "@/services/PhoneNumberLogin";
import {differenceInSeconds} from "date-fns"
import {useTranslation} from "react-i18next";
import {FCMToken} from './SetFCMToken';
import NetInfo from "@react-native-community/netinfo"
import {useSafeAreaInsets} from "react-native-safe-area-context";

/*created init*/
const Name = 'Login';

const ScreenOptions = {
    headerTitle: 'Login',
    headerShown: false,
};

const Login = () => {
    const insets = useSafeAreaInsets();
    const {colors} = useTheme();
    const {setUserInfo} = useAuth();
    const [guestIdRandom, setGuestIdRandom] = useState()
    const appState = useRef(AppState.currentState)
    const [elapsed, setElapsed] = useState(null)
    const {t, i18n} = useTranslation(['Login'], {i18n});
    const [fcmToken, setFcm] = useState(null);
    const [lte, setLte] = useState(null);
    const {height} = useWindowDimensions();
    //time otp

    const [otpCountTime, setOtpCountTime] = useState({
        seconds: 0,
        minutes: 0,
        type: 'NORMAL',
        secondsLock: 0,
        minutesLock: 0,
    })


    const [phoneNumber, setPhoneNumber] = useState({
        phoneNumber: ""
    })

    const [optNumber, setOtpNumber] = useState({
        otp: ""
    })

    const [inputValue, setInputValue] = useState('')

    const [state, setState] = useState({
        type: 'LOGIN',
        message: '',
        placeholder: `${t('PhoneNumber', {ns: "Login"})}`,
        buttonText: `${t('SendOTP', {ns: "Login"})}`,
        disabledButton: false
    });
//call api lay otp login
    const requestOTP = useRequestOtpLogin({
        "phone": phoneNumber?.phoneNumber,
    });
    console.log('requestOTP',requestOTP)
//call api xac thuc otp
    const verifyOTP = useVerifyOtpLogin({
        "answerOtp": optNumber.otp,
        "deviceId": DeviceInfo.getUniqueId(),
        "phone": phoneNumber?.phoneNumber,
    })
//call api guest login
    const {value, refetch} = useGuestLogin({
        "guestId": guestIdRandom,
        "deviceId": DeviceInfo.getUniqueId(),
        "deviceToken": fcmToken
    });
//call api loin 3g4g
    const loginLTE = useLoginLTE({
        "deviceToken": fcmToken
    })


    const handleLoginWithGSM = () => {
        NetInfo.fetch().then(net => {
            if (net?.type !== 'wifi') {
                loginLTE.refetch()
            } else {
                DialogBoxService.alert(`${t('LTE', {ns: "Login"})}`)
            }
        })
    };
    useEffect(() => {
        FCMToken().then(token => setFcm(token)); // khi vao man login, lay fcmToken da co hoac tao  moi
    }, [])


    //lu tru thoi gian vao storage
    const recordStartTime = async () => {
        try {
            const now = new Date()
            await Storage.save('START_TIME', now.toISOString())
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        Storage.get("RECENTLY_NUMBER_PHONE").then(res => {
            if (res?.phone) {
                setPhoneNumber({
                    phoneNumber: res?.phone
                })
                setInputValue(res?.phone)
            } else {
                setPhoneNumber({
                    phoneNumber: ""
                })
            }
        })
    }, [])

    useEffect(() => {
        FCMToken().then(token => setFcm(token)); // khi vao man login, lay fcmToken da co hoac tao  moi
    }, [])

    //set thgian otp tu api tra ve
    useEffect(() => {
        let sec_init = requestOTP?.valueRequest?.body?.timeDownSecond - (Math.floor(requestOTP?.valueRequest?.body?.timeDownSecond / 60) * 60)
        let min_init = Math.floor(requestOTP?.valueRequest?.body?.timeDownSecond / 60)
        if (requestOTP?.valueRequest?.body?.details) {
            if (requestOTP?.valueRequest?.body?.sendOtp) {
                setOtpCountTime({
                    seconds: sec_init < 10 ? '0' + sec_init : sec_init,
                    minutes: min_init < 10 ? '0' + min_init : min_init,
                    type: 'NORMAL',
                    secondsLock: 0,
                    minutesLock: 0,
                })
            } else if (requestOTP?.valueRequest && !requestOTP?.valueRequest?.body?.sendOtp) {
                DialogBoxService.alert(`${t('dateOTP', {ns: "Login"})}`)
                setOtpCountTime({
                    seconds: sec_init < 10 ? '0' + sec_init : sec_init,
                    minutes: min_init < 10 ? '0' + min_init : min_init,
                    type: 'NORMAL',
                    secondsLock: 0,
                    minutesLock: 0,
                })
            }
            // else if (requestOTP?.valueRequest && !requestOTP?.valueRequest?.sendOtp&&!requestOTP?.valueRequest?.result) {
            //     DialogBoxService.alert("looi he thong")
            //
            // }
            setState({
                type: 'VALID_LOGIN_OTP',
                message: `${t('EntertheOTPsenttothephonenumber', {ns: "Login"})}`,
                placeholder: 'OTP',
                buttonText: `${t('Confirm', {ns: "Login"})}`,
                disabledButton: false
            });
        } else {
            if (requestOTP?.valueRequest?.code === "ITLOCK") {
                DialogBoxService.alert(`${t('checkSDT', {ns: "Login"})}`)
            }
        }

    }, [requestOTP?.valueRequest])


    useEffect(() => {
        if (guestIdRandom) {
            refetch()
        }
    }, [guestIdRandom])

    useEffect(() => {
        (async () => {
            if (value) {
                await Keychain.setGenericPassword('username', JSON.stringify(value))
                setUserInfo(value)
            }
        })();
    }, [value])

    useEffect(() => {
        (async () => {
            if (loginLTE.value) {
                await Keychain.setGenericPassword('username', JSON.stringify(loginLTE.value))
                setUserInfo(loginLTE.value)
            }
        })();
    }, [loginLTE])

    useEffect(() => {
        if (state?.type === 'VALID_LOGIN_OTP' || otpCountTime.type === 'LOCK') {
            const time = setInterval(updateTime, 1000)
            return () => {
                clearInterval(time);
            }
        }
    }, [state, otpCountTime])

    useEffect(() => {
        (async () => {
            if (verifyOTP?.data?.code === 'API000') {
                await Keychain.setGenericPassword('username', JSON.stringify(verifyOTP.valueOTP))
                setUserInfo(verifyOTP.valueOTP)
            } else if (optNumber.otp === '' && state.type === 'VALID_LOGIN_OTP') {
                DialogBoxService.alert(`${t('PlesaeEnterOTP', {ns: "Login"})}`)
            } else if (verifyOTP?.data?.code === 'APP800') {
                DialogBoxService.alert(`${t('otpwrong', {ns: "Login"})}`, setInputValue(''), 'message-modal.otpwrong')
            } else if (['APP001', 'OTP001', 'OTP000'].includes(verifyOTP?.data?.code)) {
                let sec_init = requestOTP?.valueRequest?.body?.timeDownSecond - (Math.floor(requestOTP?.valueRequest?.body?.timeDownSecond / 60) * 60)
                let min_init = Math.floor(requestOTP?.valueRequest?.body?.timeDownSecond / 60)
                let secLock_init = verifyOTP?.valueOTP?.lockTime * 60 - (Math.floor(verifyOTP?.valueOTP?.lockTime) * 60)
                let minLock_init = Math.floor(verifyOTP?.valueOTP?.lockTime)

                Storage.delete('START_TIME')
                setElapsed(null)
                setInputValue('')
                setOtpCountTime((prev) => ({
                    seconds: sec_init < 10 ? '0' + sec_init : sec_init,
                    minutes: min_init < 10 ? '0' + min_init : min_init,
                    type: 'LOCK',
                    secondsLock: secLock_init < 10 ? '0' + secLock_init : secLock_init,
                    minutesLock: minLock_init < 10 ? '0' + minLock_init : minLock_init,
                }))
                setState((prev) => ({
                    ...prev,
                    type: 'LOGIN',
                    message: '',
                    placeholder: `${t('PhoneNumber', {ns: "Login"})}`,
                    buttonText: `${t('SendOTP', {ns: "Login"})}`,
                    disabledButton: true
                }))
                // DialogBoxService.alert(`${verifyOTP?.data?.message}`, null)
            }
        })();
    }, [verifyOTP.valueOTP])

    useEffect(() => {
        if (state.type === 'VALID_LOGIN_OTP') {
            AppState.addEventListener("change", handleAppStateChange)
            return () => AppState.removeEventListener("change", handleAppStateChange)
        }
    }, [state])


    const handleAppStateChange = async (nextAppstate) => {
        if ((nextAppstate === 'background' || nextAppstate === 'inactive') && state.type === 'VALID_LOGIN_OTP') {
            recordStartTime()
        }
        if (appState.current.match(/inactive|background/) && nextAppstate === 'active') {
            Storage.get("START_TIME").then(res => {
                const now = new Date()
                setElapsed(differenceInSeconds(now, Date.parse(res)))
            })
        }
        appState.current = nextAppstate
    }

    useEffect(() => {
        if (elapsed) {
            let normalTime = convertTime(otpCountTime.minutes, otpCountTime.seconds)
            let lockTime = convertTime(otpCountTime.minutesLock, otpCountTime.secondsLock)

            if (otpCountTime.type === 'NORMAL') {
                setOtpCountTime(prev => ({
                    ...prev,
                    seconds: normalTime.sRealTime < 10 ? '0' + normalTime.sRealTime : normalTime.sRealTime,
                    minutes: normalTime.mRealTime < 10 ? '0' + normalTime.mRealTime : normalTime.mRealTime,
                }))
            } else {
                setOtpCountTime(prev => ({
                    ...prev,
                    secondsLock: lockTime.sRealTime < 10 ? '0' + lockTime.sRealTime : lockTime.sRealTime,
                    minutesLock: lockTime.mRealTime < 10 ? '0' + lockTime.mRealTime : lockTime.mRealTime,
                }))
            }
        }
    }, [elapsed])
    const convertTime = (minutes, seconds) => {
        let changeTime = seconds + minutes * 60
        let realTime = changeTime - elapsed

        let mRealTime = realTime <= 0 ? 0 : Math.floor(realTime % 3600 / 60);
        let sRealTime = realTime <= 0 ? 0 : Math.floor(realTime % 3600 % 60);
        return {
            mRealTime: mRealTime,
            sRealTime: sRealTime
        }
    }
    const handleLoginWithPhone = () => {
        Keyboard.dismiss()
        if (state.type === 'LOGIN') {
            Storage.delete('START_TIME')
            setElapsed(null)
            setInputValue('')
            if (phoneNumber.phoneNumber === '' || phoneNumber.phoneNumber.length < 10) {
                DialogBoxService.alert(`${t('PleaseEnterPhoneNumber', {ns: "Login"})}`)
            } else {
                requestOTP.refetch();
                Storage.save("RECENTLY_NUMBER_PHONE", {phone: phoneNumber?.phoneNumber})
            }
        } else {
            verifyOTP.refetch()
        }
    };

    const onChangeText = (value) => {
        if (state.type === "LOGIN") {
            setPhoneNumber(prevState => ({
                ...prevState,
                phoneNumber: value
            }))
            setInputValue(value)

        } else {
            setOtpNumber(prevState => ({
                ...prevState,
                otp: value
            }))
            setInputValue(value)
        }
    }

    const byPassLogin = () => {
        let sec_init = requestOTP?.valueRequest?.body?.timeDownSecond - (Math.floor(requestOTP?.valueRequest?.body?.timeDownSecond / 60) * 60)
        let min_init = Math.floor(requestOTP?.valueRequest?.body?.timeDownSecond / 60)
        if (state.type === 'VALID_LOGIN_OTP') {
            setInputValue('')
            setOtpCountTime({
                seconds: sec_init < 10 ? '0' + sec_init : sec_init,
                minutes: min_init < 10 ? '0' + min_init : min_init,
                type: 'NORMAL',
                secondsLock: 0,
                minutesLock: 0,
            })
            setState({
                type: 'LOGIN',
                message: '',
                placeholder: `${t('PhoneNumber', {ns: "Login"})}`,
                buttonText: `${t('SendOTP', {ns: "Login"})}`,
                disabledButton: false
            });
        } else {
            Storage.get("GUEST_ID").then(res => {
                let randomId
                if (!res?.id) {
                    randomId = Math.round(Math.random() * 10000000)
                    Storage.save("GUEST_ID", {id: randomId})
                }
                setGuestIdRandom(res?.id ? res.id : randomId)
            })
        }
    };

//count time otp
    const updateTime = () => {
        let sec_init = requestOTP?.valueRequest?.body?.timeDownSecond - (Math.floor(requestOTP?.valueRequest?.body?.timeDownSecond / 60) * 60)
        let min_init = Math.floor(requestOTP?.valueRequest?.body?.timeDownSecond / 60)
        // neu bi khoa
        if (otpCountTime.type === 'LOCK') {
            //neu het thoi gian khoa
            if ((otpCountTime.minutesLock <= 0 && otpCountTime.secondsLock <= 0) || otpCountTime.minutesLock < 0) {
                Storage.delete('START_TIME')
                setElapsed(null)
                setState({
                    type: 'LOGIN',
                    message: '',
                    placeholder: `${t('PhoneNumber', {ns: "Login"})}`,
                    buttonText: `${t('SendOTP', {ns: "Login"})}`,
                    disabledButton: false
                })
                setOtpCountTime(() => ({
                    seconds: sec_init < 10 ? '0' + sec_init : sec_init,
                    minutes: min_init < 10 ? '0' + min_init : min_init,
                    type: 'NORMAL',
                    secondsLock: 0,
                    minutesLock: 0,
                }));
                // DialogBoxService.alert(`${t('OverTimeLock', {ns: "Login"})}`)
            } else {
                //chua het thoi gian khoa
                if (otpCountTime.secondsLock <= 0) {
                    setOtpCountTime(countTime => ({
                        ...countTime,
                        minutesLock: (countTime.minutesLock - 1) < 10 ? '0' + (countTime.minutesLock - 1) : (countTime.minutesLock - 1),
                        secondsLock: 59
                    }))
                } else {
                    setOtpCountTime(countTime => ({
                        ...countTime,
                        secondsLock: (countTime.secondsLock - 1) < 10 ? '0' + (countTime.secondsLock - 1) : (countTime.secondsLock - 1)
                    }))
                }
            }
        } else {
            //neu khong bi khoa
            if (otpCountTime.minutes <= 0 && otpCountTime.seconds <= 0) {
                Storage.delete('START_TIME')
                setElapsed(null)
                setInputValue('')
                setState({
                    type: 'LOGIN',
                    message: '',
                    placeholder: `${t('PhoneNumber', {ns: "Login"})}`,
                    buttonText: `${t('SendOTP', {ns: "Login"})}`,
                    disabledButton: false
                })
                setOtpCountTime(() => ({
                    seconds: sec_init < 10 ? '0' + sec_init : sec_init,
                    minutes: min_init < 10 ? '0' + min_init : min_init,
                    type: 'NORMAL',
                    secondsLock: 0,
                    minutesLock: 0,
                }));
                DialogBoxService.alert(`${t('OverTimeOTP', {ns: "Login"})}`)
            }
            if (otpCountTime.minutes >= 0 && otpCountTime.seconds >= 0) {
                if (otpCountTime.seconds <= 0) {
                    setOtpCountTime(countTime => ({
                        ...countTime,
                        minutes: (countTime.minutes - 1) < 10 ? '0' + (countTime.minutes - 1) : (countTime.minutes - 1),
                        seconds: 59
                    }))
                } else {
                    setOtpCountTime(countTime => ({
                        ...countTime,
                        seconds: (countTime.seconds - 1) < 10 ? '0' + (countTime.seconds - 1) : (countTime.seconds - 1)
                    }))
                }
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Box flex={1} bg={colors.background} style={{paddingBottom: insets.bottom}}>
                <Box
                    position={'relative'}
                    w={'100%'}
                    h={'auto'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    paddingTop={height > 750 ? 155 : '80px'}
                >
                    <Box
                        position={'absolute'}
                        right={0}
                        top={30}
                        cursor={'pointer'}
                        width={'auto'}
                        height={'auto'}
                        padding={5}>
                        <TouchableWithoutFeedback onPress={byPassLogin}>
                            <Image alt={'close'} style={{height: 20, width: 20}}
                                   source={require('../../assets/images/icon-close.png')}/>
                        </TouchableWithoutFeedback>
                    </Box>
                    <Box>
                        <LoginLogo/>
                    </Box>
                    <Box alignItems={'center'} mb={5} mx={'28px'}>
                        <Box minH={(otpCountTime.type === "LOCK" || state?.type === "VALID_LOGIN_OTP") ? 0 : '60px'}>
                            {state?.type === 'LOGIN' && otpCountTime.type === 'LOCK' ?
                                <Box alignItems={'center'}>
                                    <Text lineHeight={22} mb={2} color={'#5E5E5E'}
                                          fontSize={16}>{t('AccountHasBeenLocked', {ns: "Login"})}</Text>
                                    <Text lineHeight={22} mb={2} color={'#5E5E5E'}
                                          fontSize={16}>{otpCountTime.minutesLock}:{otpCountTime.secondsLock}</Text>
                                </Box>
                                :
                                <></>
                            }
                            {state?.type === 'VALID_LOGIN_OTP' && otpCountTime.type === 'NORMAL' ?
                                <Box alignItems={'center'}>
                                    <Text lineHeight={22} mb={2} color={'#5E5E5E'}
                                          fontSize={16}>{state?.message}</Text>
                                    <Text lineHeight={22} mb={2} color={'#5E5E5E'}
                                          fontSize={16}>{otpCountTime.minutes}:{otpCountTime.seconds}</Text>
                                </Box>
                                :
                                <></>
                            }
                        </Box>
                        <Input
                            mt={2}
                            mb={0}
                            value={inputValue}
                            isDisabled={state.disabledButton}
                            keyboardType={'numeric'}
                            InputLeftElement={
                                <Icon
                                    position={'absolute'}
                                    as={<Ionicons name="phone-portrait-outline"/>}
                                    size={5}
                                    ml="2"
                                    color={colors.splash}
                                />
                            }
                            onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                            name={'numberField'}
                            maxLength={11}
                            placeholder={state?.placeholder}
                            textAlign={'center'}
                        />
                    </Box>
                </Box>
                <Box mx={'24px'}>
                    <Button onPress={handleLoginWithPhone}
                            borderRadius={26}
                            paddingVertical={16}
                            _text={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
                            width={'100%'}
                            disabled={state?.disabledButton}
                            backgroundColor={colors.splash}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                            {state?.buttonText}
                        </Text>
                    </Button>
                </Box>
                <Box justifyContent={'flex-end'} flex={1}>
                    <Box
                        width={'100%'}
                        _text={{
                            fontSize: 14,
                            fontWeight: '500',
                            textAlign: 'center',
                        }}
                        borderTopWidth={1}
                        borderColor={'rgba(41,41,41,0.1)'}
                        py={'20px'}>
                        © copyright itel vietnam
                    </Box>
                </Box>
            </Box>
        </TouchableWithoutFeedback>
    );
};

export default registerScreen(Name, Login, ScreenOptions);
