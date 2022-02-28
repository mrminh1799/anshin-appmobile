import React from 'react';
import {useTranslation} from "react-i18next";
import {Box, Button} from "native-base";
import Storage from "../../utils/Storage"


const ChangeLanguage = () => {
    const {t, i18n} = useTranslation(['Settings'], {i18n});
    const selectedLanguages = i18n.language;
    const Languages = [
        {code: 'en', label: `${t('English')}`},
        {code: 'vi', label: `${t('Vietnamese')}`},
    ]
    //lưu vào storage
    const setLanguage = code => {
        Storage.save('LANGUAGE', {
            language: code,
        })
        i18n.changeLanguage(code)
    }

    return (
        <Box flex={1} alignItems={'flex-start'}>
            {
                Languages.map(language => {
                    return (
                        <Button key={language.code} onPress={() => setLanguage(language.code)}>{language.label}</Button>
                    )
                })
            }
        </Box>
    )
};
export default ChangeLanguage
