import React from 'react';
import {Box} from 'native-base';
import {Image} from 'react-native';

/* Import Component*/
import {registerScreen} from '@/navigators/utils';
import {Colors} from '@/styles/Colors';

/* Init screen*/
const Name = 'Splash';

const options = {
    stackAnimation: 'fade',
};


/*Screen*/
const Splash = () => {
    return (
        <Box flex={1} bg={Colors.light.splash} justifyContent={'center'} alignItems={'center'}>
            {/*<Image source={require('../../assets/images/ducktrong.jpeg')}/>*/}
        </Box>
    );
};

export default registerScreen(Name, Splash, options);
