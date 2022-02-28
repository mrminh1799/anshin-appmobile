import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Platform, Dimensions, FlatList, TouchableOpacity, View, useWindowDimensions} from 'react-native'
import {Icon, Text, Radio, Input, Box, Modal, HStack, ScrollView} from 'native-base'
import Event from '../../utils/EventRegister'

import FormatText from "../FormatText/index";
import {loop} from "react-native-reanimated/src/reanimated2/animation/repeat";

const ModalSelection = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isVisible, setVisible] = useState(false)
    const [state, setState] = useState({})
    const [textSearch, setTextSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const {width, height} = useWindowDimensions()
    const ref = useRef();
    const snapPoints = React.useMemo(() => ['0%', '65%', '75%'], [])
    const handleSheetChange = useCallback((index) => {
        if (index === 0) {
            setVisible(false)
        }
    }, [])


    useEffect(() => {
        //Add event modal select
        Event.on("modalOpen", ({visible, data, onChange, value, search}) => {
            setVisible(visible)
            ref?.current?.snapTo(1)
            setSearchData(data?.lstData)
            setTextSearch('')
            setState({
                lstData: data?.lstData,
                labelKey: data?.labelKey,
                valueKey: data?.valueKey,
                onChange: onChange,
                value: value,
                headerName: data?.headerName ? data?.headerName : "Chọn",
                search: search ? search : ''
            })
        })
        return () => {
            //remove event modal select
            Event.off("modalOpen")
            setVisible(false)
        }
    }, [])

    const handleChange = (item) => {
        // console.log('0-0-022',item)
        state.onChange(item)
        setVisible(!isVisible)
        ref?.current?.snapTo(0)
    }

    const handleChangeSearch = (text) => {
        let formatText = FormatText(text)
        let data = state?.lstData?.filter(item => Object.keys(item).some(key =>{
            return FormatText(String(item[key])).includes(formatText)
        }))
        setSearchData(data)
        setTextSearch(text)
    }
    // eslint-disable-next-line react/prop-types
    const renderItem = (item) => {
        const isCheck = state.value && item[state.valueKey] === state.value[state.valueKey];
        return (
            <TouchableOpacity onPress={() => handleChange(item)}>
                <Box>
                    <Text
                        m={'8px'}
                        color={'black'}
                        maxW={(width - 64) * 0.8}
                        fontSize={16}
                        lineHeight={18}
                    >
                        {item[state.labelKey]}
                    </Text>
                    {/*<Radio activeColor={'black'} onPress={() => handleChange(item)} checked={isCheck}>*/}
                    {/*    <Box/>*/}
                    {/*</Radio>*/}
                </Box>
            </TouchableOpacity>
        )
    }

    const handleHide = () => {
        ref.current.snapTo(0)
        setVisible(false)
    }

    return (
        <Modal isOpen={isVisible} onClose={() => setVisible(false)}>
            <Modal.Content maxWidth="400px">
               <Modal.Body>
                       <Input
                           rounded={12}
                           value={textSearch}
                           borderWidth={1}
                           onChangeText={(text) => handleChangeSearch(text)}
                           onFocus={() => {
                               setIsFocused(true)
                           }}
                           onBlur={() => {
                               setIsFocused(false)
                           }}
                           bg={'blue'}
                           flex={1}
                           placeholder={"Tìm kiếm"}
                           // suffix={
                           //     isFocused ? <TouchableOpacity style={{alignItems: 'center', textAlign: 'center'}}
                           //                                   onPress={() => handleChangeSearch('')}>
                           //             <Icon fontSize={16} name={'close-circle'} color={'grey'} fontFamily={'Ionicons'}/>
                           //         </TouchableOpacity>
                           //         : <></>}
                       />
                   <Box style={styles.containerView} mt={'16px'}>
                       <ScrollView style={styles.list}>
                           {searchData?.map(item=>renderItem(item))}
                       </ScrollView>
                   </Box>
               </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}


const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        maxHeight: height / 2,
    },
    containerView: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        paddingBottom: 20,
    },
    list: {
        flexGrow: 1,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // justifyContent: 'flex-start',
        maxHeight: height / 2,
        minHeight: 150,
    },
    touches: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        // shadowOffset: {width: 0, height: 2},
        // shadowColor: 'black',
        // shadowOpacity: 0.3,
        // elevation: 5,
        // shadowRadius: 6,
    },
    item: {
        flex: 1,
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        borderRadius: 10,
    }
})

export default ModalSelection
