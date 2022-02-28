import React, {useEffect, useState} from 'react';
import {Box, HStack, Input} from 'native-base';
import {FormProvider, useForm} from "react-hook-form";

const OTP = () => {
    const formMethods = useForm()

    const [otp, setOtp] = useState({
        pin1:"",
        pin2:"",
        pin3:"",
        pin4:""
    })
    useEffect(() => {})
    /**
     *
     * @param data
     */
    const handleChangeText = (data) => {
      setOtp(prevState => ({
          ...prevState,
          text: data
      }))
        //focus input
        // if (data.nextSibling) {
        //     data.nextSibling.focus()
        // }
    }

    return (
        <HStack space={4}>
            {/*{*/}
            {/*  otp?.map((item)=>*/}
            {/*      <FormProvider {...formMethods}>*/}
            {/*      <Input*/}
            {/*          maxLength={1}*/}
            {/*          value={item.text}*/}
            {/*          onChangeText={(text) => handleChangeText(text)}*/}
            {/*          // onFocus={e => e.target.select()}*/}
            {/*      />*/}

            {/*  </FormProvider>)*/}
            {/*}*/}
            <Input
            ref={"ref"}

            />


        </HStack>
    )
}


export default OTP;
