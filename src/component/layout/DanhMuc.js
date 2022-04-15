import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import {useGetProductChildCate, useGetProductParentCate} from "../../service/product";
import {useHistory} from "react-router-dom";
import './style.css'

const DanhMuc = ({data})=>{
    const list = useHistory()
    const [idCate,setIdCate] = useState()
    const [idCateParent,setIdCateParent] = useState()
    const productChildCate=useGetProductChildCate({
        id: idCate
    })
    const productParentCate=useGetProductParentCate({
        id: idCateParent
    })

    const detailListChild=(value)=>{
        setIdCate(value?.idCategory)
    }
    const detailListParent=(value)=>{
        setIdCateParent(value?.idCategory)
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
    useEffect(() => {
        if(idCateParent){
            productParentCate.refetch().then(res=>{
                if (res){
                    list.push(`/findProduct`,{
                        item: res?.data
                    })
                }
            })
        }
    },[idCateParent])

    return(
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
           {
               data?.map((item, i)=>{
                 return(

                         <li className="dropdown">
                             <Button className="btn btn-success" type="button" id="dropdownMenu2" aria-haspopup="true" aria-expanded="true">
                                 {item?.nameCategory}
                             </Button>
                             <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                 <Button className="dropdown-item" onClick={()=>detailListParent(item)}>Tất cả</Button>
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