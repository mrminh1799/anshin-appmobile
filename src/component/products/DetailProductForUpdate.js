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

            toast.toastSuccess("Xóa thành công")
        }).catch(err => {
            toast.toastError(err)
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


        productService.updateProduct(formData).then(res => {
            toast.toastSuccess("Cập nhật thành công")


        }).catch(err => {
            toast.toastError("Thêm mới thất bại")
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
        toast.toastPromise("Up ảnh thành công")
    }

    const [isModalVisible, setIsModalVisible] = useState(false);


    const [productDetailInsert, setProductDetailInsert] = useState({
        idProduct: id

    })

    const onChangeColorProductInsert = (e) => {
        setProductDetailInsert(
            {...productDetailInsert,
                idColor: e}
        )
    }

    const onChangeSizeProductInsert = (e) => {
        setProductDetailInsert(
            {...productDetailInsert,
                idSize: e}
        )
    }

    const onChangeQuantiyProductInsert =(e)=>{
        setProductDetailInsert(
            {...productDetailInsert,
                quantity: e}
        )
    }

    const showModal = () => {

        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    const handleOk = () => {
        let check=true;

        if(productDetailInsert.idColor==="lucy"||!productDetailInsert.idColor||productDetailInsert.idSize==="lucy"||!productDetailInsert.idSize||!productDetailInsert.quantity){
        if(productDetailInsert.idColor==="lucy"||!productDetailInsert.idColor){
            toast.toastError("Xin chọn màu")
            check =false;
        }
        if(productDetailInsert.idSize==="lucy"||!productDetailInsert.idSize){
            toast.toastError("Xin chọn size")
            check =false;
        }
        if(!productDetailInsert.quantity){
            toast.toastError("Xin mời mời nhập số lượng")
            check =false;
        }}else{
            productService.checkInsertProductDetail(productDetailInsert.idColor,productDetailInsert.idSize,id).then((res)=>{
                if(res.data){
                    toast.toastError("Màu và size này đã tồn tại!")
                    check = false
                }else{
                    productService.insertProductDetail(productDetailInsert).then(res=>{
                        toast.toastSuccess("Thêm mới thành công!")
                        listProductDetail.push(res.data)
                        handleCancel();
                    }).catch(err=>{
                        toast.toastError("Có lỗi xảy ra")
                    })
                    
                }
            }).catch(err=>{
                toast.toastError("Có lỗi xảy ra")
                check = false
            })

        }



        const [productDetailUpdate ,setProductDetailUpdate ]  = useState({})
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
            toast.toastPromise("Up ảnh thành công")
        }

        const [isModalVisible2, setIsModalVisible2] = useState(false);

        const handleOk2=()=>{

        }

        const showModal2 = () => {

        setIsModalVisible2(true);
        };

    const handleCancel = () => {
        setIsModalVisible2(false);

    };

        


    }

    console.log(productDetailInsert)







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
                </form>
                <div className={'d-flex'}>
                    <div className={'ml-40'}>
                        <Button onClick={handleInsertAll} style={{ display: "inline-block" }} className="mr-2" type="submit" variant="outlined">
                            Câp nhập
                        </Button>
                        <Button style={{ display: "inline-block" }} onClick={() => showModal()} className="mr-2" type="submit" variant="outlined">
                            Thêm mới sản phẩm
                        </Button>

                        <Modal title={formData.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Label>Màu: &ensp; &ensp; &ensp;  &ensp;</Label>
                            <Select onChange={(e) => onChangeColorProductInsert(e)} defaultValue="lucy" style={{ width: 140 }} >
                                <Option value="lucy">--chọn màu--</Option>
                                {listColor.map((value => {
                                    return (
                                        <Option key={value.idColor} value={value.idColor}>{value.nameColor}</Option>
                                    )
                                }))}
                            </Select>
                            &ensp;&ensp;
                            <Label>Size: &ensp;</Label>
                            <Select onChange={(e) => onChangeSizeProductInsert(e)} defaultValue="lucy" style={{ width: 120 }} >
                                <Option value="lucy">--chọn size--</Option>
                                {listSize.map((value=>{
                                    return(
                                        <Option key={value.idSize} value={value.idSize}>{}</Option>
                                    )
                                }))}
                            </Select>
                            <br></br>
                            <br></br>
                            <Label>Số lượng: &ensp;</Label> <InputNumber onChange={onChangeQuantiyProductInsert} type="number" placeholder="Số lượng" />
                            <br></br>
                            <br></br>
                            <Label>Ảnh: &ensp; &ensp; &ensp; &ensp;</Label><input type="file" onChange={onChangeUploadFileInsertProductDetail}></input>
                            <img height="200" src={productDetailInsert.image} />

                        </Modal>
                        <br></br>
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
                                    <td>{value.quantity}</td>
                                    <td>
                                        <Button onClick={() => onDeleteProductDetail(value.index, value.id)} type="button" className="btn btn-primary">Cập nhật</Button>
                                        <Modal  visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
Helo
                                        </Modal>
                                        <Button onClick={() => showModal2()} type="button" className="btn btn-danger">Xóa</Button></td>

                                    <td><label style={{ display: "block", width: 0 }} className="mb-3" htmlFor="contained-button-file">
                                        {/* <input name={value.nameColor} type="file" onChange={onChangeUploadFileProductDetail}></input> */}
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

            </div>
        </div>
    );
}

export default DetailProductForUpdate;