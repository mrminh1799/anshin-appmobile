import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './BottomNavigator';
import {registerScreen} from '../utils';
import BuyDataPackage from '../../screens/Home/BuyDataPackage/index'
import messaging from '@react-native-firebase/messaging';
import {useAuth} from '@/contexts';
import TopUpModal from "@/screens/Home/TopUp";


const HomeStack = createNativeStackNavigator();


const Name = 'HomeStack';
const HomeParams = {
    headerTitle: 'HomeStack',
    headerStyle: {backgroundColor: 'white'},
    headerShown: false,
};
const HomeNavigator = () => {
    const {userInfo} = useAuth();
    useEffect(() => {
        let topic = userInfo?.userData?.user?.userId.toString() ?? '';
        messaging().subscribeToTopic(topic);
        // subscribe theo userId
        return () => messaging().unsubscribeFromTopic(topic)
    }, []);
    return (
        <HomeStack.Navigator initialRouteName="Home"
                             screenOptions={{
                                 headerTitle: '',
                                 headerShown: false,

                             }}>
            <HomeStack.Screen {...Home.screen} />
            <HomeStack.Screen {...BuyDataPackage.screen} />
            <HomeStack.Group screenOptions={{
                presentation: 'transparentModal',
                transparentCard: true,
                cardOverlayEnabled: true,
                contentStyle: {zIndex: -999}
            }}>
                <HomeStack.Screen {...TopUpModal.screen}/>
            </HomeStack.Group>
            {/*<HomeStack.Group screenOptions={{presentation: 'transparentModal', transparentCard: true, cardOverlayEnabled: true}}>*/}
            {/*    <HomeStack.Screen {...ExchangeModal.screen}/>*/}
            {/*</HomeStack.Group>*/}
        </HomeStack.Navigator>
    );
};


export default registerScreen(Name, HomeNavigator, HomeParams);
