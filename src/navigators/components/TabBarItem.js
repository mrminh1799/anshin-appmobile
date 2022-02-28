import React from 'react';
import {TouchableWithoutFeedback, View, Text, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from 'native-base';
import {DialogBoxService} from "@/components";
import {useAuth} from "@/contexts";
import {navigate} from "@/navigators/utils";
import {useTranslation} from "react-i18next";
import {useSafeAreaInsets} from "react-native-safe-area-context";


const TabBarItem = (props) => {
    const {active, options, onPress, ...rest} = props;
    const {colors} = useTheme();
    const insets = useSafeAreaInsets();
    const {userInfo, setUserInfo} = useAuth();
    const {t, i18n} = useTranslation(['Settings'], {i18n});

    return (
        options?.isMenu ?
            <TouchableWithoutFeedback onPress={!options.disabled ? options.onPress : () => {
            }}>
                <Animated.View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 80,
                        height: 62,
                        marginBottom: insets.bottom,
                    }}>
                    {options.tabBarIcon ? options.tabBarIcon({
                        focused: !active, color: active ? colors.redBase : colors.medium, size: 0,
                    }) : null}
                    {options?.hideText ? <></> : <Text style={{
                        color: active ? colors.redBase : colors.medium,
                        marginTop: 8,
                        textAlign: 'center',
                        fontSize: 12,
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        lineHeight: 16,
                    }}> {options.tabBarLabel}</Text>}

                </Animated.View>
            </TouchableWithoutFeedback>
            :
            <TouchableWithoutFeedback onPress={!options.disabled ? onPress : (data) => {
                if (userInfo?.userData?.groupAppCode !== '087') {
                    // if(userInfo?.phoneItelBlacklist === false) {
                    //     DialogBoxService.alert('Số thuê bao của QK là số đẹp, vui lòng liên hệ 0877.087.087 để được cập nhật')
                    // }
                    DialogBoxService.alert(`${t('Login087', {ns: 'Settings'})}`)
                }
                // else {
                //
                // }
            }}{...rest}>
                <Animated.View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 80,
                        height: 62,
                        marginBottom: insets.bottom,
                    }}>
                    {options.tabBarIcon ? options.tabBarIcon({
                        focused: !active, color: active ? colors.redBase : colors.medium, size: 0,
                    }) : null}
                    {options?.hideText ? <></> : <Text style={{
                        color: active ? colors.redBase : colors.medium,
                        marginTop: 8,
                        textAlign: 'center',
                        fontSize: 12,
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        lineHeight: 16,
                    }}> {options.tabBarLabel}</Text>}
                </Animated.View>
            </TouchableWithoutFeedback>
    );
};
TabBarItem.propTypes = {
    active: PropTypes.bool,
    options: PropTypes.any,
    ref: PropTypes.any,
    animatedStyles: PropTypes.any,
    onPress: PropTypes.any
};
export default (TabBarItem);
