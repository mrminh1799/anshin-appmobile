import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import * as productService from '../../service/productService2'
import * as toast from '../../common/ToastHelper'

import { Button, FormControl, InputLabel, MenuItem, TextField } from "@material-ui/core";
import { storage } from "../firebase/firebase"
import { Editor } from '@tinymce/tinymce-react';
import { InputNumber, Modal, Select } from 'antd'
import { Label } from 'reactstrap';






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
    const { Option } = Select;




    useEffect(async () => {

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



    };



    const onChangeDescription = (content) => {



        setFormData({
            ...formData,
            description: content
        })

    }

    const onDeleteProductDetail = (index, id) => {


        let newList = listProductDetail.filter(x => x.index !== index);
        setListProductDetail(newList)
        productService.deleteProductDetail(id).then(() => {

            toast.toastSuccess("X??a th??nh c??ng")
        }).catch(err => {
            toast.toastError(err)
        })

    }

    const onChangeUploadFile = (event) => {
        if (event?.target?.files[0]) {
            const image = event.target.files[0];
            handleUpload(image);
        }
        toast.toastPromise("Up ???nh th??nh c??ng")
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
            toast.toastPromise("Upload ???nh th??nh c??ng")
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


        productService.updateProduct(formData).then(res => {
            toast.toastSuccess("C???p nh???t th??nh c??ng")


        }).catch(err => {
            toast.toastError("Th??m m???i th???t b???i")
        });

    }



    const handleUploadProductInsert = (image) => {
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
                        setProductDetailInsert({
                            ...productDetailInsert,
                            image: url
                        })
                    })

            }
        )
    }

    const onChangeUploadFileInsertProductDetail = (event) => {
        if (event?.target?.files[0]) {
            const image = event.target.files[0];
            handleUploadProductInsert(image);
        }
        toast.toastPromise("Up ???nh th??nh c??ng")
    }

    const [isModalVisible, setIsModalVisible] = useState(false);


    const [productDetailInsert, setProductDetailInsert] = useState({
        idProduct: id

    })

    const onChangeColorProductInsert = (e) => {
        setProductDetailInsert(
            {
                ...productDetailInsert,
                idColor: e
            }
        )
    }

    const onChangeSizeProductInsert = (e) => {
        setProductDetailInsert(
            {
                ...productDetailInsert,
                idSize: e
            }
        )
    }

    const onChangeQuantiyProductInsert = (e) => {
        setProductDetailInsert(
            {
                ...productDetailInsert,
                quantity: e
            }
        )
    }

    const showModal = () => {

        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);

    };

    const handleOk = () => {


        if (productDetailInsert.idColor === "lucy" || !productDetailInsert.idColor || productDetailInsert.idSize === "lucy" || !productDetailInsert.idSize || !productDetailInsert.quantity) {
            if (productDetailInsert.idColor === "lucy" || !productDetailInsert.idColor) {
                toast.toastError("Xin ch???n m??u")
            }
            if (productDetailInsert.idSize === "lucy" || !productDetailInsert.idSize) {
                toast.toastError("Xin ch???n size")
            }
            if (!productDetailInsert.quantity) {
                toast.toastError("Xin m???i m???i nh???p s??? l?????ng")
            }
        } else {
            productService.checkInsertProductDetail(productDetailInsert.idColor, productDetailInsert.idSize, id).then((res) => {
                if (res.data) {
                    toast.toastError("M??u v?? size n??y ???? t???n t???i!")
                } else {
                    productService.insertProductDetail(productDetailInsert).then(res => {
                        toast.toastSuccess("Th??m m???i th??nh c??ng!")
                        listProductDetail.push(res.data)
                        handleCancel();
                    }).catch(err => {
                        toast.toastError("C?? l???i x???y ra")
                    })
                }
            }).catch(err => {
                toast.toastError("C?? l???i x???y ra")
            })

        }
    }



    const [productDetailUpdate, setProductDetailUpdate] = useState({})
    const handleUploadProductUpdate = (image) => {
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
                        setProductDetailUpdate({
                            ...productDetailUpdate,
                            image: url
                        })
                    })

            }
        )
    }
    const onChangeUploadFileUpdateProductDetail = (event) => {
        if (event?.target?.files[0]) {
            const image = event.target.files[0];
            handleUploadProductUpdate(image);
        }
        toast.toastPromise("Up ???nh th??nh c??ng")
    }



    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const handleOk2 = (id) => {
       if(productDetailUpdate.quantity<0){
           toast.toastError("S??? l?????ng kh??ng h???p l???!")
       }else{
           productService.updateProductDetail(productDetailUpdate).then(response=>{
               toast.toastSuccess("Update th??nh c??ng")
                const newList =listProductDetail.map(x=>{
                    if(x.id==response.data.id){
                        const updatedItem ={
                            ... x,
                            quantity:response.data.quantity,
                            image: response.data.image
                        }
                        return updatedItem
                    }
                    return x;

               })

               setListProductDetail(newList);
           }).catch(error=>{
               toast.toastError("C?? l???i x???y ra")
           })
       }
       setIsModalVisible2(false);

    }

    const showModal2 = (id, quantity, image) => {
        setProductDetailUpdate({
            ...productDetailUpdate,
            id: id,
            quantity: quantity,
            image: image
        })


        setIsModalVisible2(true);
    };

    const onChangeQuantiyProductUpdate =(e)=>{
        setProductDetailUpdate({
            ...productDetailUpdate,
            quantity: e
        })

        console.log(productDetailUpdate)
    }

    









    return (
        <div>
            <div className="container ml-200 mt-5">
                <h1>{formData.name}</h1>
                <form autoComplete="off" style={{ flex: 1 }}>


                    <input type="file" onChange={onChangeUploadFile}></input>
                    <img height="200" src={formData.image} />

                    <InputLabel id="demo-simple-select-label5">T??n s???n ph???m</InputLabel>
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="name"
                        value={formData.name}
                        fullWidth

                        className="my-2"
                    />

                    <InputLabel id="demo-simple-select-labe2l">Gi?? s???n ph???m</InputLabel>
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="price"
                        value={formData.price}
                        fullWidth

                        className="mb-2"
                        type="number"
                    />


                    <InputLabel id="demo-simple-select-label">Th??? lo???i</InputLabel>
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
                        M?? t??? s???n ph???m

                        <Editor onEditorChange={onChangeDescription} value={formData.description} />
                    </div>
                    <br />
                </form>
                <div className={'d-flex'}>
                    <div className={'ml-40'}>
                        <Button onClick={handleInsertAll} style={{ display: "inline-block" }} className="mr-2" type="submit" variant="outlined">
                            C??p nh???p
                        </Button>
                        <Button style={{ display: "inline-block" }} onClick={() => showModal()} className="mr-2" type="submit" variant="outlined">
                            Th??m m???i s???n ph???m
                        </Button>

                        <Modal title={formData.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Label>M??u: &ensp; &ensp; &ensp;  &ensp;</Label>
                            <Select onChange={(e) => onChangeColorProductInsert(e)} defaultValue="lucy" style={{ width: 140 }} >
                                <Option value="lucy">--ch???n m??u--</Option>
                                {listColor.map((value => {
                                    return (
                                        <Option key={value.idColor} value={value.idColor}>{value.nameColor}</Option>
                                    )
                                }))}
                            </Select>
                            &ensp;&ensp;
                            <Label>Size: &ensp;</Label>
                            <Select onChange={(e) => onChangeSizeProductInsert(e)} defaultValue="lucy" style={{ width: 120 }} >
                                <Option value="lucy">--ch???n size--</Option>
                                {listSize.map((value => {
                                    return (
                                        <Option key={value.idSize} value={value.idSize}>{ }</Option>
                                    )
                                }))}
                            </Select>
                            <br></br>
                            <br></br>
                            <Label>S??? l?????ng: &ensp;</Label> <InputNumber onChange={onChangeQuantiyProductInsert} type="number" placeholder="S??? l?????ng" />
                            <br></br>
                            <br></br>
                            <Label>???nh: &ensp; &ensp; &ensp; &ensp;</Label><input type="file" onChange={onChangeUploadFileInsertProductDetail}></input>
                            <img height="200" src={productDetailInsert.image} />

                        </Modal>
                        <br></br>
                    </div>
                </div>
                <table className="table table-striped table-bordered table-hover shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th>STT</th>
                            <th>M??u</th>
                            <th>Size</th>
                            <th>S??? l?????ng</th>
                            <th>???nh</th>
                            <th>Thao t??c</th>
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
                                    <td>{value.quantity}</td>
                                    <td>
                                        <Modal visible={isModalVisible2} onOk={()=>handleOk2()} onCancel={handleCancel}>
                                            <Label>S??? l?????ng: &ensp;</Label> <InputNumber value={productDetailUpdate.quantity} onChange={onChangeQuantiyProductUpdate} type="number" placeholder="S??? l?????ng" />
                                            
                                            <Label>???nh: &ensp; &ensp; &ensp; &ensp;</Label><input type="file" onChange={onChangeUploadFileUpdateProductDetail}></input>
                                            <img height="200" src={productDetailUpdate.image} />
                                        </Modal>
                                        <Button onClick={() => showModal2(value.id, value.quantity, value.image)} type="button" className="btn btn-danger">C???p nh???t</Button>
                                        <Button onClick={() => onDeleteProductDetail(value.index, value.id)} type="button" className="btn btn-primary">X??a</Button>

                                    </td>

                                    <td><label style={{ display: "block", width: 0 }} className="mb-3" htmlFor="contained-button-file">
                                        {/* <input name={value.nameColor} type="file" onChange={onChangeUploadFileProductDetail}></input> */}
                                        <img height="50" src={value.image} />
                                    </label></td>
                                </tr>
                            );
                        })}
                        {console.log(listProductDetail)}


                    </tbody>
                </table>



                <div>
                    {/* <input name="image" onChange={handleChange} style={{ display: "none" }} accept="image/*"
                            id="contained-button-file" type="file" /> */}
                </div>

            </div>
        </div>
    );
}

export default DetailProductForUpdate;