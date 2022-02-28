import React, {useState} from 'react';
import {Box, Button, Icon, Text} from 'native-base'
import PropTypes from 'prop-types';
import {Colors} from "@/styles/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {TouchableOpacity} from "react-native";

const Collapse = ({
                      label,
                      content,
                      style,
                      collapseStyle,
                      labelStyle,
                  }) => {

    const [isActive, setIsActive] = useState(false)

    const border = isActive ? Colors.light.lightBlue : Colors.dark.lightShade

    const labelBackground = isActive ? Colors.light.lightBlue : 'white'

    const labelColor = isActive ? 'white' : 'black'

    return (
        <Box style={style}>
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => {
                    setIsActive(prevState => !prevState)
                }}>
                <Box
                    px={'17px'} py={'13px'}
                    rounded={4}
                    borderColor={border}
                    borderWidth={2}
                    bg={labelBackground}
                    flexDir={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                style={collapseStyle}>
                    <Text fontSize={14} fontWeight={700} color={labelColor} style={labelStyle}>
                        {label}
                    </Text>
                    <Icon as={isActive ? <AntDesign name="down"/> : <AntDesign name="up"/>} size={'6'}
                          color={labelColor}/>
                </Box>
            </TouchableOpacity>
            {
                isActive &&
                <Box px={'14px'} pt={'10px'}>
                    {content}
                </Box>
            }
        </Box>
    )
}

Collapse.propTypes = {
    label: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    style: PropTypes.any,
    collapseStyle: PropTypes.any,
    labelStyle: PropTypes.any,
}

export default Collapse;
