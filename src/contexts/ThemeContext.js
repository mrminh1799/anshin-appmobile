import React, {createContext, useContext, useState} from 'react';

import PropsType from 'prop-types';
import {extendTheme} from 'native-base';
import {Colors} from '@/styles/Colors';

const ThemeContext = createContext(
    'useAuth should be used inside AuthProvider',
);

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState({
        value: extendTheme({
            colors: {
                ...Colors.light,
            },
        }),
        type: 'light',
    });

    const value = {
        theme,
        setTheme,
    };

    return <ThemeContext.Provider {...{value, children}} />;
};

ThemeProvider.propTypes = {
    children: PropsType.any,
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (typeof context === 'string') {
        throw new Error(context);
    }
    return context;
};
