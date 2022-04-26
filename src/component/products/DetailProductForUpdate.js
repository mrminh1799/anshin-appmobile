import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import * as productService from '../../service/productService2'
import * as toast from '../../common/ToastHelper'

import { Button, FormControl, Input, InputLabel, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import { storage } from "../firebase/firebase"
import { Editor } from '@tinymce/tinymce-react';
import { Select2 } from "select2-react-component";






function DetailProductForUpdate() {
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [listProductDetail, setListProductDetail] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [listColor, setListColor] = useState([])
    const [listCategory, setListCategory] = useState([]);
    const [listColorSelected, setListColorSelected] = useState([]);
    const [listSizeSelected, setListSizeSelected] = useState([]);
    const history = useHistory()

    useEffect(async() => {

        productService.findAllSize().then((res) => {
            setListSize(res.data);
        })

        productService.findAllColor().then((res) => {
            setListColor(res.data);
        })

        productService.findAllCategoryChild().then((res) => {
            setListCategory(res.data);
        })

        productService.findProductById(id).then((res) => {
            setListSize(res.data.listSize);
            setListColor(res.data.listColor);


            setFormData({
                id: id,
                description: res.data.description,
                name: res.data.name,
                price: res.data.price,
                image: res.data.image,
                idCategory: res.data.categoryId
            }
            )
            const newList = []
            let i = 1
            res.data.listDetailProduct.map(detail => {
               
                newList.push({
                    index: i++,
                    id: detail.id,
                    idColor: detail.color.id,
                    idSize: detail.size.id,
                    image: detail.image,
                 
                    nameColor: detail.color.colorName,
                    nameSize: detail.size.size_name,
                    quantity: detail.quantity
                })
            })
            setListProductDetail(newList)


        })
 
    }, id)





    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        console.log(formData)

    };



    const onChangeDescription = (content) => {



        setFormData({
            ...formData,
            description: content
        })

    }

    const onCheckBoxColor = (e , id, name) => {
        listColor.map(x=>{
            if(x.idColor === id){
                setListColor([...listColor,{...x, isSelected: true}])
            }
        })

    }


    const onCheckBoxSize = (e) => {

        if (e.target.checked === true) {
            setListSizeSelected([
                ...listSizeSelected, {
                    idSize: e.target.id,
                    nameSize: e.target.value
                }
            ])

        } else {
            const newList = listSizeSelected.filter(x => x.idSize !== e.target.id)
            setListSizeSelected(newList);
        }

    }

    const createProductDetail = (event) => {
        setListProductDetail([])

        let newList = [];
        let index = 1;
        event.preventDefault()
        listColorSelected.map(c => {
            listSizeSelected.map(s => {
                newList.push({
                    index: index++,
                    idColor: c.idColor,
                    nameColor: c.nameColor,
                    idSize: s.idSize,
                    nameSize: s.nameSize,
                    quantity: 0,
                    image: ""
                })
            })

        })

        setListProductDetail(newList)


    }

    const onDeleteProductDetail = (index, id) => {

    
        let newList = listProductDetail.filter(x => x.index !== index);
        setListProductDetail(newList)
        productService.deleteProductDetail(id).then(()=>{
            console.log(id)

            toast.toastSuccess("Xóa thành công")
        }).catch(err=>{
            toast.toastError(err)
        })

    }

    const handleSelect = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            //[name]: category.find(item => item.id === value)
            idCategory: value,
            categoryId: name
        })

    }




    const onChangeUploadFile = (event) => {
        if (event?.target?.files[0]) {
            const image = event.target.files[0];
            handleUpload(image);
        }
        toast.toastPromise("Up ảnh thành công")
    }

    const handleUpload = (image) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {

            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setFormData({
                            ...formData,
                            image: url
                        })
                    })

            }
        )
    }

    const onChangeUploadFileProductDetail = (event) => {
        if (event?.target?.files[0]) {
            const image = event.target.files[0];
            const colorName = event.target.name
            handleUploadProductDetail(image, colorName);
            toast.toastPromise("Upload ảnh thành công")
        }
    }

    const handleUploadProductDetail = (image, colorName) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {

            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        const newList = []
                        listProductDetail.map(x => {
                            if (x.nameColor === colorName) {
                                newList.push({ ...x, image: url })
                            } else {
                                newList.push(x)

                            }
                        })

                        setListProductDetail(newList)
                        // setFormData({
                        //     ...formData,
                        //     image: url
                        // })
                    })

            }
        )
    }

    const handleInsertAll = (e) => {
        e.preventDefault();


        const body = {
            name: formData.name,
            image: formData.image,
            price: formData.price,
            categoryId: formData.idCategory,
            description: formData.description,
            listDetail: listProductDetail.map(x => {
                return (
                    {
                        quantity: x.quantity,
                        idSize: x.idSize,
                        idColor: x.idColor,
                        image: x.image
                    }
                )
            })
        }


        productService.createProductAndProductDetail(body).then(res => {
            toast.toastSuccess("Tạo mới thành công")
            history.push(`/admin/productDetailUD/${res.data}`)
        }).catch(err => {
            toast.toastError("Thêm mới thất bại")
        });

    }

    return (
        <div>

           


            <div className="container ml-200 mt-5">
            <h1>{formData.name}</h1>
                <form autoComplete="off" style={{ flex: 1 }}>


                    <input type="file" onChange={onChangeUploadFile}></input>
                    <img height="200" src={formData.image} />

                    <InputLabel id="demo-simple-select-label5">Tên sản phẩm</InputLabel>
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="name"
                        value={formData.name}
                        fullWidth

                        className="my-2"
                    />

                    <InputLabel id="demo-simple-select-labe2l">Giá sản phẩm</InputLabel>
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="price"
                        value={formData.price}
                        fullWidth

                        className="mb-2"
                        type="number"
                    />


                    <InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
                    <select className='form-control js-example-basic-single' name="idCategory" onChange={onChangeHandler} value={formData.idCategory}>

                        {
                            listCategory?.length > 0 && listCategory?.map((item, index) => {
                                return (
                                    <option key={index} value={item?.id}>{item?.name}</option>
                                )
                            })
                        }
                    </select>




                    <div>
                        <br></br>
                        Mô tả sản phẩm

                        <Editor onEditorChange={onChangeDescription} value={formData.description} />
                    </div>
                    <br />
                    
        
                    <div className={'d-flex'}>
                        <div className={'ml-40'}>
                            <Button onClick={createProductDetail} style={{ display: "inline-block" }} className="mr-2" type="submit" variant="outlined">
                                Cập nhật
                            </Button>
                        </div>
                    </div>
                    <table className="table table-striped table-bordered table-hover shadow">
                        <thead className="thead-dark">
                            <tr>
                                <th>STT</th>
                                <th>Màu</th>
                                <th>Size</th>
                                <th>Số lượng</th>
                                <th>Ảnh</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProductDetail.map(function (value, index) {
                                return (
                                    <tr
                                        key={index}  >
                                        <td>{value.index}</td>
                                        <td>{value.nameColor}</td>
                                        <td>{value.nameSize}</td>
                                        <td><input type="number" value={value.quantity}></input></td>
                                        <td><Button onClick={() => onDeleteProductDetail(value.index, value.id)} type="button" className="btn btn-danger">Xóa</Button></td>
                                        <td><label style={{ display: "block", width: 0 }} className="mb-3" htmlFor="contained-button-file">
                                            <input name={value.nameColor} type="file" onChange={onChangeUploadFileProductDetail}></input>
                                            <img height="50" src={value.image} />
                                        </label></td>
                                    </tr>
                                );
                            })}


                        </tbody>
                    </table>


                    <div>
                        {/* <input name="image" onChange={handleChange} style={{ display: "none" }} accept="image/*"
                            id="contained-button-file" type="file" /> */}
                    </div>
                    <Button onClick={handleInsertAll} style={{ display: "inline-block" }} className="mr-2" type="submit" variant="outlined">
                        Lưu
                    </Button>

                </form>
            </div>
        </div>
    );
}

export default DetailProductForUpdate;