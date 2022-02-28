import React from 'react'
import throttle from 'lodash.throttle'

/**
 * @author ANHVTN11
 * 01/11/2019
 * */

const navigateSafe = (navigate, time = 2000) =>
    throttle(navigate, time, {trailing: false})

export const navigatorRef = React.createRef()

export const drawerRef = React.createRef();

export const tabBarRef = React.createRef();

export const goBack = () => {
    navigatorRef?.current?.goBack()
}

export const navigate = (routeName, params) => {
    navigatorRef?.current?.navigate(routeName, params)
}

export const getCurrentRoute = () => {
    return navigatorRef?.current?.getCurrentRoute()
}

export const registerScreen = (name, Comp, options, initialParams = {}) => {
    return {
        screen: {
            name,
            component: Comp,
            options,
            initialParams,
        },
        present: (navigation, params) => {
            navigateSafe(navigation.navigate({name, params: params}))
        },
    }
}
