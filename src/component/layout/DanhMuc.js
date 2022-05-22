import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import {useGetProductChildCate, GetProductParentCate} from "../../service/product";
import {useHistory} from "react-router-dom";
import './style.css'
import {useDispatch} from "react-redux";

const DanhMuc = ({data})=>{
    const list = useHistory()
    const [idCate,setIdCate] = useState()
    const dispatch = useDispatch()
    const productChildCate=useGetProductChildCate({
        id: idCate
    })

    const detailListChild=(value)=>{
        setIdCate(value?.idCategory)
    }
    const detailListParent=(value)=>{
        dispatch(GetProductParentCate({
            id: value.idCategory
        },res=>{
            if (res){
                console.log(res.data)
                list.push(`/findProduct`,{
                    item: res
                })
            }
        }))
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

    return(
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
           {
               data?.map((item, i)=>{
                 return(

                         <li className="dropdown">
                             <Button onClick={()=>detailListParent(item)} className="btn btn-success" type="button" id="dropdownMenu2" aria-haspopup="true" aria-expanded="true">
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