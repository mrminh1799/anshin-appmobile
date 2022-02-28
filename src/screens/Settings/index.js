import React, {useState, useEffect} from 'react';
//UI + Component
import {TouchableOpacity, NativeEventEmitter} from 'react-native';
import {Box, Center, Collapse, Text, VStack, Icon, useTheme, HStack, Divider, Image, ScrollView} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "@/styles/Colors";
import TopUpModal from '../Home/TopUp';
//Utils
import {useTranslation} from "react-i18next";
import {navigate, registerScreen} from '@/navigators/utils';
import ChangeLanguage from "@/screens/ChangeLanguage";
import { PaymentProvider } from '@/contexts/PaymentContext';

const Name = 'Settings';
const ScreenOptions = {
    headerTitle: 'Settings',
    headerShown: false,
};
const dataArray = [
    {title: "First Element", content: "Lorem ipsum dolor sit amet"},
    {title: "Second Element", content: "Lorem ipsum dolor sit amet"},
    {title: "Third Element", content: "Lorem ipsum dolor sit amet"}
];
const Settings = () => {
    const {t, i18n} = useTranslation(['Settings'], {i18n});
    const {colors} = useTheme();
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);

    return (
        <Center flex={1} bg={Colors.light.lightBlue}>
            <Text>Không có gì đâu</Text>
        </Center>
    )
}
export default registerScreen(Name, Settings, ScreenOptions)
