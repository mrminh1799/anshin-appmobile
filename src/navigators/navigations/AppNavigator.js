import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

import {AuthProvider} from '@/contexts';
import {navigatorRef} from '@/navigators/utils';
import {DialogBoxService, DialogBox} from "@/components";
import DrawerNavigator from "./DrawerNavigator";
import {PaymentProvider} from "@/contexts/PaymentContext";
import ModalSelection from "@/components/SelectInput/ModalSelection";

const App = () => {
    const routeNameRef = React.useRef();


    return (
        <NavigationContainer
            ref={navigatorRef}
            onReady={() => {
                routeNameRef.current = navigatorRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigatorRef.current.getCurrentRoute().name;
                if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                    });
                }
                routeNameRef.current = currentRouteName;
            }}
        >
            <>
                <AuthProvider>
                    <PaymentProvider>
                        <DrawerNavigator/>
                    </PaymentProvider>
                    <DialogBox childRef={(ref) => DialogBoxService.setDialogRef(ref)}/>
                </AuthProvider>
                <ModalSelection/>
            </>
        </NavigationContainer>
    );
};

export default App;

