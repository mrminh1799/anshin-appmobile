import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext(
    'usePayment should be used inside PaymentProvider',
);

export const PaymentProvider = ({ children }) => {
    const [paymentInfo, setPaymentInfo] = useState(null);
    const value = {
        paymentInfo, setPaymentInfo
    }
    return (<PaymentContext.Provider {...{ value, children }} />)
}

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (typeof context === 'string') {
        throw new Error(context);
    }
    return context;
};