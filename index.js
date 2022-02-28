/**
 * @format
 */
//import './wdyr';
import {AppRegistry, StatusBar} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {ThemeProvider} from '@/contexts/ThemeContext';
import 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native'

console.disableYellowBox = true;

const Root = () => {
    return (
        <ThemeProvider>
            <StatusBar backgroundColor={'#ED1F24'}/>
            <App/>
        </ThemeProvider>
    );
};
AppRegistry.registerComponent(appName, () => Sentry.withTouchEventBoundary(Root));
