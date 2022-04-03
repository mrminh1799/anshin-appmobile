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


