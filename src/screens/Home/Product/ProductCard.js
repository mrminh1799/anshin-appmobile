import React from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Image, Text, View} from "native-base";
import {TouchableOpacity} from "react-native";
import {navigate} from "@/navigators/utils";
import {useGetDetailProduct} from "@/services/Product";
const ProductCard =({item})=>{
    const getDetailProduct = useGetDetailProduct({
        id:item?.id,
    })


    const toDetailProduct =()=>{
        getDetailProduct.refetch().then(res=>{
            if(res){
                navigate('ProductDetail',{
                    data: res
                })
            }
        })
    }
    return(
        <TouchableOpacity
            onPress={toDetailProduct}
            style={{
                width: '48%',
                marginVertical: 14,
            }}>
            <View >
                <View
                    style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 10,
                        backgroundColor: 'black',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 8,
                    }}>

                    <View
                        style={{
                            position: 'absolute',
                            width: '20%',
                            height: '24%',
                            backgroundColor: 'green',
                            top: 0,
                            left: 0,
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: 'white',
                                fontWeight: 'bold',
                                letterSpacing: 1,
                            }}>
                            8%
                        </Text>
                    </View>
                    <Image style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                    }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/anshin-b910b.appspot.com/o/sale50%25.jpg?alt=media&token=e5503710-23f7-472c-b530-5b017bd0f93f"}}/>


                </View>
                <Text
                    style={{
                        fontSize: 12,
                        color: 'black',
                        fontWeight: '600',
                        marginBottom: 2,
                    }}>
                    {item?.name}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <FontAwesome
                        name="circle"
                        style={{
                            fontSize: 12,
                            marginRight: 6,
                            color: 'green',
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            color: 'green',
                        }}>
                        Available
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <FontAwesome
                        name="circle"
                        style={{
                            fontSize: 12,
                            marginRight: 6,
                            color: 'red',
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            color: 'red',
                        }}>
                        Unavailable
                    </Text>
                </View>
                <Text>{item?.price} VND</Text>
            </View>

        </TouchableOpacity>
    )
}
export default ProductCard
