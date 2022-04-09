import { Tabs, Row, Col, Input, Table, Button } from 'antd'
import { useEffect, useState } from 'react';
import * as productService from '../../service/productService2'

const { TabPane } = Tabs;



function TabOrder({listOrder}) {

    
    function callback(key) {
        console.log(key);
    }

  

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Màu',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    return (
        <Tabs className="w-100 p-3 border" defaultActiveKey={1} onChange={callback}>
            {listOrder.map(x => {
                return (
                    <TabPane tab={x.id} key={x.id}>
                        <Table pagination={false}   size='small'  columns={columns}
                            dataSource={
                                x.listOrderDetail.map((detail) => {
                                    return {
                                        name: detail.productName,
                                        size: detail.orderDetail.detailProduct.size.size_name,
                                        color: detail.orderDetail.detailProduct.color.colorName,
                                        quantity: detail.orderDetail.quantity,
                                        price: detail.price,
                                        action: <Button type="primary" danger> Xóa</Button>
                                    }
                                })
                            }
                            footer={() => 
                            {
                                return(
                                    <>
                                    Tổng tiền:    {x.sumPrice}
                                    <Button type="primary" > Thanh toán</Button>
                                    
                                    </>
                                )
                            }
                            }
                        /> 
                      

                      
                        
                    </TabPane>
                )

            })}




        </Tabs>
    );
}

export default TabOrder;