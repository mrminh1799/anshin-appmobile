import { Button, FormControl, Input, InputLabel, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { storage } from "../firebase/firebase"
//import {storage} from "../../firebase/index"
import { Editor } from '@tinymce/tinymce-react';
import * as productService from '../../service/productService2'
import * as toast from '../../common/ToastHelper'
import { useHistory } from 'react-router-dom';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';





const productImage = "https://i.pinimg.com/originals/a0/86/47/a08647cec486718eaf66a38d6f6f8784.png";




function DetailProduct() {
    const { id } = useParams();
    const [formData, setFormData] = useState({})
    const [description, setDescription] = useState("");
    const [listSize, setListSize] = useState([]);
    const [listColor, setListColor] = useState([])
    const [listCategory, setListCategory] = useState([]);
    const [listColorSelected, setListColorSelected] = useState([]);
    const [listSizeSelected, setListSizeSelected] = useState([]);


    const [listProductDetail, setListProductDetail] = useState([]);
    const history = useHistory()






    useEffect(() => {

        productService.findAllSize().then((res) => {
            setListSize(res.data);
        })

        productService.findAllColor().then((res) => {
            setListColor(res.data);
        })

        productService.findAllCategoryChild().then((res) => {
            setListCategory(res.data);
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
        setDescription(content)
        console.log(content)

        setFormData({
            ...formData,
            description: content
        })
        console.log(formData)
    }

    const onCheckBoxColor = (e) => {
        console.log(e.target)
        if (e.target.checked === true) {
            setListColorSelected([
                ...listColorSelected, {
                    idColor: e.target.id,
                    nameColor: e.target.value
                }
            ])

        } else {
            const newList = listColorSelected.filter(x =>
                x.idColor !== e.target.id)
            setListColorSelected(newList);
        }
        console.log(listColorSelected)
    }


    const onCheckBoxSize = (e) => {
        console.log(e.target)
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
        console.log(listSizeSelected)
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

    const onDeleteProductDetail = (index) => {
        let newList = listProductDetail.filter(x => x.index !== index);
        setListProductDetail(newList)
    }

    const handleSelect = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            //[name]: category.find(item => item.id === value)
            //   idCategory: value,
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
                console.log(error)
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
                console.log(error)
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
    console.log(listProductDetail)
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



    const handlerQuantityProductDetail = (e, index) => {
        const newList = listProductDetail.map(x => {
            if (x.index === index) {
                x.quantity = e.target.value;
            }
            return x;

        })

        setListProductDetail(newList)

    }



    return (
        <div>

            
            <div className="container ml-5">
                <br></br>
               
            <h1 className="ml-200">Thêm mới</h1>


                <form autoComplete="off" style={{ flex: 1 }}>


                    <input title="Ảnh" type="file" onChange={onChangeUploadFile}/>
                    <img height="200" src={formData.image} />
                    

                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="name"
                        value={formData.name}
                        fullWidth
                        label="Tên sản phẩm"
                        className="my-2"
                    />
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="price"
                        value={formData.price}
                        fullWidth
                        label="Giá"
                        className="mb-2"
                        type="number"
                    />
                    <br></br>
                    <br></br>
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

                        <Editor onEditorChange={onChangeDescription} value={description} />
                    </div>
                    <br />
                    <div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" for="inlineCheckbox1">Màu</label>
                        </div>
                        {listColor.map(x => {
                            return (
                                <div key={x.id} className="form-check form-check-inline">
                                    <input onChange={onCheckBoxColor} className="form-check-input" type="checkbox" id={x.id} value={x.colorName}></input>
                                    <label className="form-check-label" for="inlineCheckbox1">{x.colorName}</label>
                                </div>
                            )
                        })}
                        <Button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Thêm mới
                        </Button>
                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Thêm mới màu</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tên màu: <input className="form-control"></input>
                                    </div>
                                    <div className="modal-footer">
                                        <Button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</Button>
                                        <Button type="button" className="btn btn-primary">Thêm</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" for="inlineCheckbox1">Size</label>
                        </div>
                        {listSize.map(x => {
                            return (

                                <div key={x.id} className="form-check form-check-inline">
                                    <input onChange={onCheckBoxSize} className="form-check-input" type="checkbox" id={x.id} value={x.size_name}></input>
                                    <label className="form-check-label" for="inlineCheckbox1">{x.size_name}</label>
                                </div>
                            )
                        })}
                        <Button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
                            Thêm mới
                        </Button>
                        <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Thêm mới Size</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tên size: <input className="form-control" ></input>
                                    </div>
                                    <div className="modal-footer">
                                        <Button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</Button>
                                        <Button type="button" className="btn btn-primary">Thêm</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'d-flex'}>
                        <div className={'ml-40'}>
                            <Button onClick={createProductDetail} style={{ display: "inline-block" }} className="mr-2" type="submit" variant="outlined">
                                Tạo
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
                                        <td><input type="number" value={value.quantity} onChange={e => handlerQuantityProductDetail(e, value.index)}></input></td>
                                        <td><Button onClick={() => onDeleteProductDetail(value.index)} type="button" className="btn btn-danger">Xóa</Button></td>
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

export default DetailProduct;