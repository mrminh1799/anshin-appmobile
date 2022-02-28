import React, { createContext, useContext, useState } from 'react';

const CustomerContext = createContext(
    'useCustomer should be used inside CustomerProvider',
);

export const CustomerProvider = ({ children }) => {
    const [question, setQuestion] = useState(null);
    const value = {
        question, setQuestion
    }
    return (<CustomerContext.Provider {...{ value, children }} />)
}

export const useCustomer = () => {
    const context = useContext(CustomerContext);
    if (typeof context === 'string') {
        throw new Error(context);
    }
    return context;
};