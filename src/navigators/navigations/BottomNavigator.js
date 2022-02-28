/*Import Library*/
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/*Import component*/
import {navigate, registerScreen} from '../utils';
import {TabBar, TabBarIcon} from '../components';


/*Import routes*/
import CoopHome from '@/screens/Home';
import Settings from '@/screens/Settings';



/*Create & init*/
const Tab = createBottomTabNavigator();
import {tabBarRef} from "@/navigators/utils";
import {useAuth} from "@/contexts";
import {useTranslation} from "react-i18next";

/*icons*/


const Name = 'Home';
const HomeParams = {};


const getTabBarVisible = (route) => {
    const params = route.params;
    if (params) {
        if (params.tabBarVisible === false) {
            return false;
        }
    }
    return false;
};
const Home = () => {
    const {t, i18n} = useTranslation(['HomePage', 'Settings'], {i18n});
    const {userInfo, setUserInfo} = useAuth()

    return (
        <Tab.Navigator
            screenOptions={{
                lazy: true,
                headerTitle: '',
                headerShown: false,
                style: {paddingTop: 8},
            }}
            tabBar={(props) => <TabBar ref={tabBarRef} {...props} />}
        >
            <Tab.Screen
                {...CoopHome.screen}
                options={(route) => ({
                    tabBarVisible: getTabBarVisible(route),
                    tabBarLabel: `${t('Home', {ns: "HomePage"})}`,
                    tabBarIcon: (props) => (
                        <TabBarIcon {...props} source={require('@/assets/icons/Tabs/home.png')}/>
                    ),
                })}
            />
            {/*<Tab.Screen*/}
            {/*    {...CustomerCenter.screen}*/}
            {/*    options={{*/}
            {/*        tabBarLabel: `${t('support', {ns: "HomePage"})}`,*/}
            {/*        tabBarIcon: (props) => (*/}
            {/*            <TabBarIcon {...props} source={require('@/assets/icons/Tabs/support.png')}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Tab.Screen*/}
            {/*    {...ItelClub.screen}*/}
            {/*    options={{*/}
            {/*        // isMenu: true,*/}
            {/*        // onPress: () => DialogBoxService.alert(`${t('functiondevelopment', {ns: 'Settings'})}`),*/}
            {/*        hideText: true,*/}
            {/*        tabBarLabel: '',*/}
            {/*        tabBarIcon: (props) => (*/}
            {/*            <TabBarIcon {...props} color={'#ED1F24'} source={require('@/assets/images/Group.png')}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Tab.Screen*/}
            {/*    {...Settings.screen}*/}
            {/*    options={{*/}
            {/*        onPress: () => toThongTinThueBao(),*/}
            {/*        tabBarLabel: `${t('account', {ns: "HomePage"})}`,*/}
            {/*        tabBarIcon: (props) => (*/}
            {/*            <TabBarIcon {...props} source={require('@/assets/icons/Tabs/account.png')}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                {...Settings.screen}
                options={(route) => ({
                    isMenu: true,
                    onPress: () => route.navigation.openDrawer(),
                    tabBarLabel: 'Menu',
                    tabBarIcon: (props) => (
                        <TabBarIcon {...props} source={require('@/assets/icons/icon-menu.png')}/>
                    ),
                })}
            />
        </Tab.Navigator>
    );
};

export default registerScreen(Name, Home, HomeParams);
