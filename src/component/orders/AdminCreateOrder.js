import { Tabs, Row, Col, Input, Button, Table, Image, Modal } from 'antd'
import { useEffect, useState } from 'react';
import TabOrder from './TabOrder';
import CustommerInformation from './CustommerInformation';
import { useConfirm } from 'material-ui-confirm';


import * as productService from '../../service/productService2'
import * as toast from '../../common/ToastHelper'

const { TabPane } = Tabs;

function AdminCreateOrder() {
    const [listOrder, setListOrder] = useState([]);
    const [listOrderDetail, setListOrderDetail] = useState([])

    const [listProduct, setListProduct] = useState([])

    const [listProductDetail, setListProductDetail] = useState([])

    const [idOrder, setIdOrder] = useState("");
    const [idProductDetail, setIdProductDetail] = useState("");
    const [quantityProdcutDetail, setQuantityProductDetail] = useState("")
    const confirm = useConfirm();
    const [nameProductDetail, setNameProductDetail] = useState("")
    const [infoCustomer, setInforCustomer] = useState({});
    const [newName, setNewName] = useState("")


    const setFirstOrder = (list) => {

        list.map(res => {
            setListOrderDetail(pre => {
                return [
                    ...pre, {
                        idOrderDetail: res.orderDetail.id,
                        nameProduct: res.productName,
                        sizeName: res.orderDetail.detailProduct.size.size_name,
                        coloName: res.orderDetail.detailProduct.color.colorName,
                        quantity: res.orderDetail.quantity,
                        price: res.price

                    }
                ]
            })
        })
    }

    const setFirstListProductDetail = (list) => {
        list.map(res => {
            setListProductDetail(pre => {
                return [
                    ...pre, {
                        id: res.id,
                        colorId: res.color.id,
                        colorName: res.color.colorName,
                        idSize: res.size.id,
                        sizeName: res.size.size_name

                    }
                ]
            })
        })
    }


    useEffect(() => {
        productService.findAllOrderForCreateOrder().then(res => {
            setListOrder(res.data);
            const arr = res.data;
            setIdOrder(arr[0].id)
            setFirstOrder(arr[0].listOrderDetail)
            setInforCustomer({
                fullName: arr[0].fullName,
                address: arr[0].address,
                phoneNumber: arr[0].phoneNumber
            })
        })

        productService.findProductByName("").then(res => {
            setListProduct(res.data);
            const arr = res.data;
            setNameProductDetail(arr[0].name);
            productService.findAllProductDetailForProductID(arr[0].id).then(res => {
                setFirstListProductDetail(res.data)
            })


        })


    }, [])



    function callback(key) {
        setIdOrder(key)
        productService.getAllOrderDetailInOrderForIdOrder(key).then(res => {
            setListOrderDetail(res.data);

        })

        productService.findOrderForId(key).then(res => {
            setInforCustomer({
                fullName: res.data.fullName,
                address: res.data.address,
                phoneNumber: res.data.phoneNumber

            })
        })


    }



    const columns = [
        {
            title: 'T??n s???n ph???m',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'M??u',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'S??? l?????ng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Gi??',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'H??nh ?????ng',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    const onDeleteOrderDetail = (e, idOrderDetail) => {
        confirm({
            description: "B???n c?? ch???c x??a s???n ph???m kh???i h??a ????n?",
            title: 'X??c nh???n x??a'
        }).then(() => {
            const newList = listOrderDetail.filter(x => x.idOrderDetail !== idOrderDetail)
            setListOrderDetail(newList)
            productService.deleteOrderDetaiForId(idOrderDetail).then(res => {
                toast.toastSuccess("X??a th??nh c??ng")
            }).catch(err => {
                toast.toastError("C?? l???i x???y ra")
            })
        })
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false)
    const showModal = (id) => {
        setIdProductDetail(id)
        setQuantityProductDetail("")
        setIsModalVisible(true);
    };


    const showModal2 = () => {

        setNewName("")
        setIsModalVisible2(true);
    };

    const handleOk = () => {

        productService.createOrderDetail(idOrder, idProductDetail, quantityProdcutDetail).then(res => {
            toast.toastSuccess("Th??m s???n ph???m v??o h??a ????n th??nh c??ng")
            setListOrderDetail([...listOrderDetail,
            {
                idOrderDetail: res.data.orderDetail.id,
                nameProduct: res.data.productName,
                sizeName: res.data.orderDetail.detailProduct.size.size_name,
                coloName: res.data.orderDetail.detailProduct.color.colorName,
                quantity: res.data.orderDetail.quantity,
                price: res.data.price
            }])
        }).catch(err => {
            toast.toastError("C?? l???i x???y ra")
        })

        setIsModalVisible(false);
    };




    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
    };


    const onChangeQuantityProductDetail = (e) => {
        setQuantityProductDetail(e.target.value)
        console.log(quantityProdcutDetail)
        console.log(idProductDetail)
        console.log(idOrder)

    }

    const findProductForName = (event) => {
        const name = event.target.value;
        productService.findProductByName(name).then(res => {
            setListProduct(res.data)
        }).catch(err => {
            toast.toastError("C?? l???i x???y ra")
        })

    }

    const findProductDetail = id => {
        setListProductDetail([])
        productService.findAllProductDetailForProductID(id).then(res => {
            setFirstListProductDetail(res.data)
        }).catch(err => {
            toast.toastError("C?? l???i x???y ra")
        })
    }

    const onChangeInfoCustomer = async (e) => {

        const { name, value } = e.target

        console.log(value)
        setInforCustomer({
            ...infoCustomer,
            [name]: value
        })
        await productService.updateInfomatinCustomerInOrder(idOrder, infoCustomer.fullName, infoCustomer.address, infoCustomer.phoneNumber)

    }


    const onEditChange = (key) => {
        confirm({
            description: "B???n c?? ch???c mu???n xo?? h??a ????n n??y?",
            title: 'X??c nh???n x??a'
        }).then(() => {
            console.log(listOrder)
            console.log(key)


            const newList  = listOrder.filter(x => String(x.id) !== String(key))

            setListOrder(newList)
            productService.deleteOrderTransaction(key).then(() => {
                toast.toastSuccess("x??a th??nh c??ng")  
               
            })



        })
    }




    const onChangeNameCustomer = (e) => {
        setNewName(e.target.value)
        console.log(newName)

    }

    const handleOk2 = () => {
        console.log(newName)
        productService.createOrderForAdmin(newName).then(res => {
            if(listOrder.length==0){
                setIdOrder(res.data.id)
            }
            setListOrder([res.data, ...listOrder])
            toast.toastSuccess("T???o h??a ????n th??nh c??ng")
        }).catch(err => {
            toast.toastError("C?? l???i x???y")
        })
        setIsModalVisible2(false)
    }


    const paymantHandler =()=>{
        if(listOrderDetail?.length>0){
            productService.paymentOrder(idOrder).then(res=>{
                toast.toastSuccess("Thanh to??n th??nh c??ng")
                const newList = listOrder.filter(x=>x.id!==idOrder)
                setListOrder(newList)
            })   .catch(err=>{
                toast.toastError("C?? l???i x???y ra")
            })
        }else{
            toast.toastError("Ch??a ch???n s???n ph???m n??o ????? thanh to??n")
        }
    }

    return (
        <>

            <div className='container'>
               {listOrder.length==0 ? 
               <>
               <Button size='small' onClick={() => showModal2()} >T???o h??a ????n m???i</Button>
                                            
               <Modal title="T???o m???i h??a ????n" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel}>
                   <Input name='nameCustomer' onChange={onChangeNameCustomer} value={newName} placeholder='T??n kh??ch h??ng' ></Input>
               </Modal>
               </> :
               <></>
            }
                <Row>


                    <Tabs hideAdd type="editable-card" size="small" className="w-100 p-3 border" defaultActiveKey={1} onChange={callback} onEdit={onEditChange}>
                        {listOrder.map(x => {
                            return (

                                <TabPane tab={x.fullName} key={x.id}>
                                    <Row>
                                        <Col className="border" span={15}>
                                            <Table pagination={false} size='small' columns={columns}
                                                dataSource={
                                                    listOrderDetail.map((detail) => {
                                                        return {
                                                            id: detail.idOrderDetail,
                                                            name: detail.nameProduct,
                                                            size: detail.sizeName,
                                                            color: detail.coloName,
                                                            quantity: detail.quantity,
                                                            price: detail.price,
                                                            action: <Button size='small' type="primary" onClick={(e) => onDeleteOrderDetail(e, detail.idOrderDetail)} danger> X??a</Button>

                                                        }
                                                    })
                                                }
                                                footer={() => {
                                                    return (
                                                        <>
                                                            T???ng ti???n:    {x.sumPrice}
                                                        </>
                                                    )
                                                }
                                                }
                                            />
                                        </Col>
                                        <Col className='border' span={9}>
                                            <h5>Th??ng tin kh??ch h??ng</h5>
                                            <Input placeholder="T??n" name='fullName' value={infoCustomer.fullName} onChange={e => onChangeInfoCustomer(e)} ></Input>
                                            <Input placeholder="?????a ch???" name="address" value={infoCustomer.address} onChange={e => onChangeInfoCustomer(e)}></Input>
                                            <Input placeholder="S??? ??i???n tho???i" name="phoneNumber" value={infoCustomer.phoneNumber} onChange={e => onChangeInfoCustomer(e)}></Input>
                                            <Button size='small' onClick={paymantHandler}  type='primary'>Thanh to??n</Button>
                                            <Button size='smaill' onClick={() => showModal2()} >T???o h??a ????n m???i</Button>

                                            <Modal title="T???o m???i h??a ????n" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel}>
                                                <Input name='nameCustomer' onChange={onChangeNameCustomer} value={newName} placeholder='T??n kh??ch h??ng' ></Input>
                                            </Modal>

                                        </Col>
                                    </Row>
                                </TabPane>

                            )

                        })}
                    </Tabs>
                </Row>
                <Row>
                    <Col className='border' span={12}>
                        <Input onChange={findProductForName} placeholder="T??m ki???m s???n ph???m"></Input>

                        <Table pagination={{ pageSize: 6 }} size='small' columns={[
                            {
                                title: '???nh',
                                dataIndex: 'image',
                                key: 'image',
                            },
                            {
                                title: 'T??n',
                                dataIndex: 'name',
                                key: 'name',
                            },
                            {
                                title: 'Gi??',
                                dataIndex: 'price',
                                key: 'price',
                            }
                            ,
                            {
                                title: '',
                                dataIndex: 'action',
                                key: 'action',
                            }
                        ]}
                            dataSource={
                                listProduct.map(x => {
                                    return (
                                        {
                                            id: x.id,
                                            image: <Image height={45} src={x.image}></Image>,
                                            name: x.name,
                                            price: x.price,
                                            action: <Button size='small' type='primary' onClick={() => findProductDetail(x.id)}>Chi ti???t s???n ph???m</Button>

                                        }
                                    )
                                })
                            }
                        />


                    </Col>
                    <Col className='border' span={12}>
                        <h5>{nameProductDetail}</h5>
                        <Table pagination={false} size='small' columns={[
                            {
                                title: 'M??u',
                                dataIndex: 'color',
                                key: 'color',
                            },
                            {
                                title: 'Size',
                                dataIndex: 'size',
                                key: 'size',
                            },
                            {
                                title: 'H??nh ?????ng',
                                dataIndex: 'action',
                                key: 'action',
                            },
                        ]}
                            dataSource={
                                listProductDetail.map(x => {
                                    return ({
                                        color: x.colorName,
                                        size: x.sizeName,
                                        action: <>
                                            <Button type="primary" onClick={() => showModal(x.id)}>
                                                Th??m v??o h??a ????n
                                            </Button>
                                        </>
                                    })

                                })
                            }
                        >
                        </Table>

                    </Col>
                </Row>
                <Modal title="Th??m s???n ph???m v??o h??a ????n" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Input type="number" name='quantityProdcutDetail' onChange={onChangeQuantityProductDetail} value={quantityProdcutDetail} placeholder='S??? l?????ng' ></Input>
                </Modal>
            </div>
        </>

    );
}

export default AdminCreateOrder;