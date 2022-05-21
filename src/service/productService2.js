
////// Tất cả API Trưởng dùng

import axiosHelper from "../common/axiosHelper";


export const findAllSize = ()=>{
    return axiosHelper.get("http://localhost:8080/size/findAll");
}

export const findAllColor = ()=>{
    return axiosHelper.get("http://localhost:8080/color/findAll");
}

export const findAllCategoryChild =()=>{
    return axiosHelper.get("http://localhost:8080/admin/Categories/findByCon");
}

export const createProductAndProductDetail=(body)=>{
    return axiosHelper.post("http://localhost:8080/admin/product/insertProductandListProductDetail", body)
}

// update
export const findProductById=(id)=>{
    return axiosHelper.get(`http://localhost:8080/product/findById/${id}`)
}

export const deleteProductDetail=(id)=>{
    return axiosHelper.delete(`http://localhost:8080/admin/detailProduct/delete/${id}`)
}


export const findAllProduct= ()=>{
    return axiosHelper.get("http://localhost:8080/product/findAll");
}

export const updateStatusProduct=(id)=>{
    return axiosHelper.get(`http://localhost:8080/product/updateStatus/${id}`)
}

export const findAllOrderForCreateOrder=()=>{
    return axiosHelper.get("http://localhost:8080/admin/order/findOrderForCreateAdmin")
}


export const getAllOrderDetailInOrderForIdOrder=(id)=>{
    return axiosHelper.get(`http://localhost:8080/Order/findListOrderDetailForOrderId/${id}`)
}

export const findProductByName=(name)=>{
    return axiosHelper.post("http://localhost:8080/product/findAllByNameCategory2", {name: name})
}

export const findAllProductDetailForProductID=(id) =>{
    return axiosHelper.get(`http://localhost:8080/admin/detailProduct/findAllById/${id}`);
}

export const createOrderDetail=(idOrder, idProductDetail, quantity)=>{
    return axiosHelper.post("http://localhost:8080/Order/createOrderDetail", {idOrder: idOrder, idProduct: idProductDetail, quantity: quantity})
}

export const deleteOrderDetaiForId=(id)=>{
    return axiosHelper.get(`http://localhost:8080/Order/deleteOrderDetailById/${id}`)
}

export const findOrderForId=(id)=>{
    return axiosHelper.get(`http://localhost:8080/admin/order/findById/${id}`)
}

export const updateInfomatinCustomerInOrder=(id, fullName, address, phoneNumber)=>{
    return axiosHelper.put(`http://localhost:8080/Order/updateInfomatinCustomer/${id}`,{
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber
    })
}

export const createOrderForAdmin=(name)=>{
    return axiosHelper.get(`http://localhost:8080/Order/createNewOrderForAdmin/${name}`)
}

export const deleteOrderTransaction=(idOrder)=>{
    return axiosHelper.delete(`http://localhost:8080/Order/deleteTransaction/${idOrder}`)
    }


export const paymentOrder = (idOrder)=>{
    return axiosHelper.get(`http://localhost:8080/Order/updateStatus/${idOrder}/2`)
}



export const deleteSoftProduct = (idProduct)=>{
    return axiosHelper.delete(`http://localhost:8080/admin/product/delete/${idProduct}`)
}

export const updateProduct = ( productDTO)=>{
    return axiosHelper.post("http://localhost:8080/product/udpateProduct", productDTO);
}

export const checkInsertProductDetail=(idColor, idSize, idProduct)=>{
    return axiosHelper.get(`http://localhost:8080/productDetail/finByColorSizeProduct/${idColor}/${idSize}/${idProduct}`);
}

export const insertProductDetail =(dto)=>{
    return axiosHelper.post("http://localhost:8080/product/insertProductDetail", dto);
}

