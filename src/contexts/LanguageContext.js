import React, {createContext, useContext, useState} from 'react';

import PropsType from 'prop-types';

const LanguageContext = createContext(
    'useAuth should be used inside AuthProvider',
);

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState("vi");


    const value = {
        language,
        setLanguage,
    };

    return <LanguageContext.Provider {...{value, children}} />;
};

LanguageProvider.propTypes = {
    children: PropsType.any,
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (typeof context === 'string') {
        throw new Error(context);
    }
    return context;
};
