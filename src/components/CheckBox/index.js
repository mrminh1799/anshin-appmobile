import React from 'react';
import {Box, Checkbox, Text} from 'native-base'
import PropTypes from 'prop-types';
import {useController, useFormContext} from "react-hook-form";
import {StyleSheet} from "react-native";

const CheckBoxComponent = ({
                               label,
                               name,
                               defaultValue,
                               rules,
                               ...restOfProps
                           }) => {

    const [state, setState] = React.useState(false);

    const formContext = useFormContext();

    const {control, errors} = formContext;

    const {field} = useController({name, rules, defaultValue, control});

    const handleCheck = () => {
        setState(state => (!state))
    }
    React.useEffect(() => {
        field.onChange(state ? 1 : 0)
        return () => {
            field.onChange(0)
        }
    }, [state])
    return (
        <Box m={5} row alignItems={'center'}>
            <Text mr={10}>{label}</Text>
            <Checkbox {...restOfProps} checked={state} value={field.value} onChange={handleCheck}/>
            {!!errors[name] && <Text style={styles.error}>{errors[name]?.message}</Text>}
        </Box>

    )
}
const styles = StyleSheet.create({
    labelContainer: {
        position: 'absolute',
        paddingHorizontal: 8,
        backgroundColor: 'white',
    },
    label: {
        marginTop: 2,
        fontSize: 14,
    },
    error: {
        marginTop: 4,
        marginLeft: 12,
        fontSize: 12,
        color: '#B00020',
    },
});

CheckBoxComponent.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    rules: PropTypes.object,
}

export default CheckBoxComponent;
