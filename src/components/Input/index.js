import React from 'react';
import { Input } from 'native-base';

const TextInput = (props) => {
    return (
        <Input
            borderWidth={1}
            h={'50px'}
            w={'100%'}
            bg={'white'}
            rounded={5}
            fontSize={14}
            my={4}
            {...props}
        />
    );
};

export default TextInput;
