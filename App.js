/*Import Libraries*/
import React, {useEffect} from 'react';
import RNSplashScreen from 'react-native-splash-screen';
import {INativebaseConfig, NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useNetInfo} from '@react-native-community/netinfo'
// import CodePush from "react-native-code-push";
import messaging from '@react-native-firebase/messaging';
import {SendNotiVNPay} from '@/stores/Notification/NotificationAction';
import {Settings} from 'react-native-fbsdk-next';
/* Import Components */
import '@/modules/localization';
import {store} from '@/stores';
import AppNavigator from '@/navigators/navigations/AppNavigator';
import {useThemeContext} from '@/contexts/ThemeContext';
import {GoogleSignin} from "@react-native-google-signin/google-signin";
/* Init Config Exception */
/* required to improvement native screens*/
import {LogBox, Platform} from 'react-native';
import Config from 'react-native-config'
import * as Sentry from "@sentry/react-native";
import {getBuildNumber, getBundleId, getVersion, getUniqueId} from "react-native-device-info";


const routingInstrumentation = new Sentry.ReactNavigationV5Instrumentation();

enableScreens();

// setJSExceptionHandler((error, isFatal) => {
//     Sentry.captureException(error)
// });
//
// const exceptionHandler = (error, isFatal) => {
//     Sentry.captureException(error)
// };
//
// setJSExceptionHandler(exceptionHandler, false);
//
// setNativeExceptionHandler((errorString) => {
//     Sentry.captureException(errorString)
// });

/*Config Strict mode*/
const config: INativebaseConfig = {
    strictMode: 'off',
};
const queryClient = new QueryClient();

// FileLogger.configure({
//     dailyRolling: true,
//     maximumNumberOfFiles: 7,
// });

// // Ask for consent first if necessary
// // Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message


//* Init Sentry
if (!__DEV__) {
    Sentry.init({
        dsn: Config.DNS,
        release: `${getBundleId()}:${getVersion()}:${getBuildNumber()}`,
        dist: getBuildNumber(),
        // To set a uniform sample rate
        tracesSampleRate: 0.2,
        integrations: [
            new Sentry.ReactNativeTracing({
                routingInstrumentation,
                tracingOrigins: ["localhost", "app.itel.vn", /^\//],
                shouldCreateSpanForRequest: url => {
                    // Do not create spans for outgoing requests to a `/health/` endpoint
                    return !url.match(/\/health\/?$/);
                },
                beforeNavigate: context => {
                    // Decide to not send a transaction by setting sampled = false
                    if (context.data.route.name === "Do Not Send") {
                        context.sampled = false;
                    }
                    // Modify the transaction context
                    context.name = context.name.toUpperCase();
                    context.tags = {
                        ...context.tags,
                        customTag: "value",
                    };

                    return context;
                },
            }),
        ],
    });
    if (Platform.OS === "android") {
        Sentry.addGlobalEventProcessor(event => {
            // Get the ANDROID_ID
            const id = getUniqueId();
            // If the user does not exist, set the id to be the unique id.
            if (!event.user) {
                event.user = {id};
            }
            return event;
        });
    }
}

GoogleSignin.configure({
    iosClientId: '653240281859-mim24i1gvfsbr31k2a660cv19ohvhqv0.apps.googleusercontent.com',
    webClientId: '653240281859-r7nl1gq1uqqflos4vqvibe0rukd24v89.apps.googleusercontent.com',
    scopes: ['email'],
    offlineAccess: true,
});


/* Init App */
const App = () => {
    const {theme} = useThemeContext();
    const netInfo = useNetInfo();

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }


    useEffect(() => {
        if (netInfo.isConnected != null && !netInfo.isConnected) {
            // DialogBoxService.alert("Không có kết nối Internet Vui lòng thử lại");
        }
    }, [netInfo])

    useEffect(() => {
        RNSplashScreen.hide();

        // CodePush.sync({
        //     updateDialog: true,
        //     installMode: CodePush.InstallMode.IMMEDIATE
        // });
        requestUserPermission().catch((e) => {
            // error(e);
        });

    }, []);

    useEffect(() => {
        messaging().onMessage(async remoteMessage => {
            store.dispatch(SendNotiVNPay(remoteMessage))
        });
    }, []);

    useEffect(() => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            store.dispatch(SendNotiVNPay(remoteMessage))
        });
    }, [])

    return (
        <NativeBaseProvider config={config} theme={theme.value}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <AppNavigator/>
                    </Provider>
                </QueryClientProvider>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
};
export default App;
