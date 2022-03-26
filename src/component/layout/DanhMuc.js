import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import {useGetProductChildCate} from "../../service/product";
import {useHistory} from "react-router-dom";

const DanhMuc = ({data})=>{
    const list = useHistory()
    const [idCate,setIdCate] = useState()
    const productChildCate=useGetProductChildCate({
        id: idCate
    })

    const detailListChild=(value)=>{
        setIdCate(value?.idCategory)
    }

    useEffect(() => {
        if(idCate){
            productChildCate.refetch().then(res=>{
                if (res){
                    list.push(`/findProduct`,{
                        item: res?.data
                    })
                }
            })
        }
    },[idCate])

    // useEffect(() => {
    //     if(productChildCate?.data){
    //
    //     }else {
    //         alert('Sản phẩm tạm thời hết')
    //     }
    // },[productChildCate?.data])

    return(
        <div sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style={{marginBottom:20}}>
           {
               data?.map((item, i)=>{
                 return(

                         <li  className="dropdown">
                             <Button  className="btn btn-success" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 {item?.nameCategory}
                             </Button>

                             <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                 <Button  className="dropdown-item" type="button">Tất cả</Button>

                                 {
                                     item?.listChild?.map((item, index)=>{
                                         return(
                                             <Button onClick={()=>detailListChild(item)} className="dropdown-item" >{item?.nameCategory}</Button>
                                         )
                                     })
                                 }

                             </div>
                         </li>


                 )
               })
           }
       </div>
    )
}
export default DanhMuc