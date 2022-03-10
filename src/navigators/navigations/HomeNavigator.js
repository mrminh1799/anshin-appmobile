import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './BottomNavigator';
import {registerScreen} from '../utils';
import messaging from '@react-native-firebase/messaging';
import {useAuth} from '@/contexts';
import ProductDetail from "@/screens/Home/Product/ProductDetail";


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
            <HomeStack.Screen {...ProductDetail.screen} />

        </HomeStack.Navigator>
    );
};


export default registerScreen(Name, HomeNavigator, HomeParams);
