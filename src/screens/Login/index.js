import React, {useEffect, useRef, useState} from 'react';
import {Box, useTheme, Icon, Image, Text, HStack} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
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
    const [guestIdRandom, setGuestIdRandom] = useState()
    const [elapsed, setElapsed] = useState(null)
    const {t, i18n} = useTranslation(['Login'], {i18n});
    const [fcmToken, setFcm] = useState(null);
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

    useEffect(() => {
        FCMToken().then(token => setFcm(token)); // khi vao man login, lay fcmToken da co hoac tao  moi
    }, [])

    const handleLoginWithPhone = () => {
        Keyboard.dismiss()
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
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Box flex={1} bg={colors.background} style={{paddingBottom: insets.bottom}}>
                <Box
                    position={'relative'}
                    w={'100%'}
                    h={'auto'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    paddingTop={height > 750 ? 200 : '80px'}
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
                    <Box mb={'60px'}>
                        <Text fontWeight={700} fontSize={35}>ANSHIN FASHION</Text>
                    </Box>
                    <Box alignItems={'center'} mb={5} mx={'28px'}>
                        <Input
                            mt={2}
                            mb={0}
                            value={inputValue}
                            isDisabled={state.disabledButton}
                            InputLeftElement={
                                <Icon
                                    as={<Feather name="user"/>}
                                    size={5}
                                    ml="2"
                                    color={'black'}
                                />
                            }
                            onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                            name={'account'}
                            maxLength={11}
                            placeholder={'Tài khoản'}
                        />
                        <Input
                            mt={2}
                            mb={0}
                            value={inputValue}
                            isDisabled={state.disabledButton}
                            InputLeftElement={
                                <Icon
                                    as={<Feather name="lock"/>}
                                    size={5}
                                    ml="2"
                                    color={'black'}
                                />
                            }
                            onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                            name={'password'}
                            maxLength={11}
                            placeholder={'Mật khẩu'}
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
                            Đăng nhập
                        </Text>
                    </Button>
                </Box>
            </Box>
        </TouchableWithoutFeedback>
    );
};

export default registerScreen(Name, Login, ScreenOptions);
