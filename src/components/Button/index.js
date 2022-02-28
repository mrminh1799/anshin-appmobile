import React from 'react';

import {TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Box} from 'native-base';

const Button = ({_text, onPress, icon, children, style, ...props}) => {
    return (
        <TouchableOpacity onPress={onPress}
                          activeOpacity={.7}
                          {...props}
                          style={[{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}, props, style]}>
            <Box flexDirection={'row'}>
                {icon && <Image resizeMode={'stretch'} style={{width: 20, height: 20, marginLeft: 10, marginRight: 8}}
                                source={icon}/>}
                <Text style={[{textAlign: 'center'}, _text]}>
                    {children}
                </Text>
            </Box>
        </TouchableOpacity>
    );
};
Button.propTypes = {
    _text: PropTypes.object,
    onPress: PropTypes.func,
    children: PropTypes.any,
    style: PropTypes.any,
    icon: PropTypes.number,
};
export default Button;
