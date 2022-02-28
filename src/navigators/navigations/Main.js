import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryCache, QueryClient, QueryClientProvider, useIsFetching} from "react-query";
import * as Sentry from "@sentry/react-native";
/*Import component*/
import Home from './HomeNavigator';
import {useAuth} from '@/contexts';
import Splash from '@/screens/Splash';
import Boarding from '@/screens/Boarding';
import Login from '@/screens/Login';
import Storage from "@/utils/Storage";
import {useTranslation} from "react-i18next";
import {DialogBoxService} from "@/components";
import TextInput from "@/components/Input";
import {Text} from "native-base";
import {Text as TextNative} from "react-native";
import {COMMON} from "@/constants";
import Keychain from "react-native-keychain";

const MainStack = createNativeStackNavigator();
const Main = () => {
    const {splash, setSplash, userInfo, setUserInfo} = useAuth();
    const {t, i18n} = useTranslation(['Footer', 'ServicePage'], {i18n});

    const isFetching = useIsFetching();

    // check error 401 -> logout
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (async (error, query) => {
                Sentry.captureException(error)
                Sentry.captureMessage(query)
                DialogBoxService.alert(error.message);
                if (error?.statusCode == 401) {
                    await Storage.delete(COMMON.ACCESS_TOKEN_GG)
                    await Keychain.resetGenericPassword()
                    setUserInfo(null)
                }
            })
        })
    })

    //Splash screen show
    React.useEffect(() => {
        //* async init module here
        const timer = setTimeout(() => {
            setSplash(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [splash]);

    //set lại ngôn ngữ
    useEffect(() => {
        Storage.get("LANGUAGE").then(res => {
            i18n.changeLanguage(res ? res.language : "vi")
        })
    }, [])

    useEffect(() => {
        if (isFetching > 0) {
            DialogBoxService.showLoading()
        } else {
            DialogBoxService.hideLoading()
        }
        return () => {
            DialogBoxService.hideLoading();
        }
    }, [isFetching])


// Override Text scaling
    if (Text.defaultProps) {
        Text.defaultProps.allowFontScaling = false;
    } else {
        Text.defaultProps = {};
        Text.defaultProps.allowFontScaling = false;
    }
// Override Text scaling
    if (TextNative.defaultProps) {
        TextNative.defaultProps.allowFontScaling = false;
    } else {
        TextNative.defaultProps = {};
        TextNative.defaultProps.allowFontScaling = false;
    }
// Override Text scaling in input fields
    if (TextInput.defaultProps) {
        TextInput.defaultProps.allowFontScaling = false;
    } else {
        TextInput.defaultProps = {};
        TextInput.defaultProps.allowFontScaling = false;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <MainStack.Navigator
                screenOptions={{
                    headerTitle: '',
                    headerShown: false,
                }}>
                <MainStack.Group screenOptions={{presentation: 'modal'}}>
                    {(!splash && !userInfo) && <MainStack.Screen {...Login.screen} />}
                </MainStack.Group>
                <MainStack.Group>
                    {splash && <MainStack.Screen {...Splash.screen} />}
                    {userInfo && <MainStack.Screen {...Home.screen}/>}
                </MainStack.Group>
            </MainStack.Navigator>
        </QueryClientProvider>
    );
};

export default Main;
