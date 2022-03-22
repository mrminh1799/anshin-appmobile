import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext(
    'useAuth should be used inside AuthProvider',
);

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);


    const value = {
        loading,
        setLoading,
        userInfo,
        setUserInfo,
    };

    return <AuthContext.Provider {...{value, children}} />;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (typeof context === 'string') {
        throw new Error(context);
    }
    return context;
};
