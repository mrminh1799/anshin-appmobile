import React, {forwardRef, useImperativeHandle, useState, useRef} from 'react';
import {Animated, SafeAreaView, View} from 'react-native';
import {Route} from '@react-navigation/core';
import PropTypes from 'prop-types';
import TabBarItem from './TabBarItem';
import {useTheme} from 'native-base';
import {useAnimatedBottom, useAnimatedHeightBottom} from "@/utils/Other";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {loop} from "react-native-reanimated/src/reanimated2/animation/repeat";


const TabBar = ({state, descriptors, navigation}, ref) => {
    const {colors} = useTheme();
    const insets = useSafeAreaInsets();
    const [stateTabBar, setStateTabBar] = useState({
        tabBarVisible: true,
    })

    const transition = useAnimatedBottom(stateTabBar.tabBarVisible)
    const maxHeight = useAnimatedHeightBottom(stateTabBar.tabBarVisible, (62 + insets.bottom))

    const onTabPress = (route, index) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (state.index !== index && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    const onTabLongPress = (route: Route<string>) => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };


    useImperativeHandle(ref, () => ({
        hideTabBar: () => showHideTabBar(false),
        showTabBar: () => showHideTabBar(true),
    }));


    const showHideTabBar = (visible) => {
        setStateTabBar(() => {
            return {
                tabBarVisible: visible
            }
        })
    }

    return (
        <Animated.View
            style={{
                backgroundColor: colors.white,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                position: 'absolute',
                bottom: 0,
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                width: "100%",
                transform: [{translateY: transition}],
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 1,
            }}>
            {state.routes.map((route, index) => (
                <TabBarItem
                    key={route.key}
                    active={index === state.index}
                    options={descriptors[route.key].options}
                    onPress={() => onTabPress(route, index)}
                    onLongPress={() => onTabLongPress(route)}
                />
            ))}
        </Animated.View>
    );
};
TabBar.propTypes = {
    state: PropTypes.object,
    descriptors: PropTypes.any,
    navigation: PropTypes.any,
    onPress: PropTypes.func,
};

export default forwardRef(TabBar);
