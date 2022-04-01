import React, {useEffect, useState} from "react";
import {TextField, Button, Select, MenuItem, InputLabel, FormControl} from "@material-ui/core";
import callApi from "../callAPI/apiCaller";
import {storage} from "../firebase/firebase"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from "axios";
import {Box, Modal} from "@mui/material";
import { Link } from "react-router-dom";

function FormProduct({
                         clickedRow,
                         setClickedRow,
                         formData,
                         setFormData,
                         setProduct,
                         product,
                         categoriesId,
                         setPage,
                         totalPage,
                         setLoading,
                         formDataInItValue
                     }) {

    const [open, setOpen] = useState(false)

    const [category, setCategory] = useState([]);
    const productImage = "https://i.pinimg.com/originals/a0/86/47/a08647cec486718eaf66a38d6f6f8784.png";
    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    // useEffect(() => {
    //     callApi(`category`, "GET", null)
    //         .then((res) => {
    //             const { data } = res
    //             setCategory(data)
    //             setFormData({
    //                 ...formData,
    //                 category: data[0]
    //             })
    //         })
    // }, [])

    const onCreateProduct = () => {
        setLoading(true)
        callApi(`product`, "POST", !formData?.image ? {
            ...formData,
            image: productImage
        } : formData)
            .then((response) => {
                // if (product.length >= 10) {
                //     setPage(totalPage + 1)
                //     return;
                // }
                const {data} = response
                console.log(formData)
                console.log(data)
                setProduct([...product, data]);
                setLoading(false)
            })
    };

    const onUpdateProduct = () => {
        setLoading(true)
        callApi(`product`, "PUT", formData)
            .then((response) => {
                setProduct((oldState) => {
                    let newState = oldState.map((value, index) => {
                        return index == clickedRow ? formData : value;
                    });
                    return newState;
                });
                setLoading(false)
            })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (clickedRow != -1) {
            onUpdateProduct();
        } else {
            onCreateProduct();
        }
        btnClearForm();
    };
    const btnClearForm = (event) => {
        setClickedRow(-1)
        setFormData({
            ...formDataInItValue,
            category: category[0]
        });
    };
    const handleChange = (event) => {
        if (event?.target?.files[0]) {
            const image = event.target.files[0];
            handleUpload(image);
        }
    }

    const handleSelect = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: category.find(item => item.id === value)
        })
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
    return (
        <div>
            <Box>
                
                {/* <Link to="/admin/productDetail/1" >Link</Link> */}
            </Box>
            <Modal
                style={{
                    overflow: "scroll"
                }}
                keepMounted
                open={open} onClose={() => {
                setOpen(false)
            }} className="px-5 pt-4">
                <div style={{
                    backgroundColor: 'white',
                    marginLeft: 100,
                    marginRight: 100,
                }}  name="product" className="border rounded p-4 shadow row">
                    <div className="pl-3 pr-5 pt-3">
                        <label htmlFor="contained-button-file">
                            <img className="shadow rounded" style={{width: 200}}
                                 src={formData?.image ? formData.image : productImage}/>
                        </label>
                    </div>
                    <form onSubmit={onSubmitHandler} autoComplete="off" style={{flex: 1}}>
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
                        <TextField
                            required
                            onChange={onChangeHandler}
                            name="avaiable"
                            value={formData.avaiable}
                            fullWidth
                            label="Số lượng"
                            className="mb-3"
                            type="number"
                        />
                        <div className={'d-flex'}>
                            <div style={{
                                flex: 1
                            }}>
                                <FormControl fullWidth
                                             className="mb-3">
                                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="category"
                                        fullWidth
                                        value={category?.length > 0 && formData.category?.id}
                                        onChange={handleSelect}
                                    >
                                        {
                                            category?.length > 0 && category?.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth
                                             className="mb-3">
                                    <InputLabel id="demo-simple-select-label">Màu</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="category"
                                        fullWidth
                                        value={category?.length > 0 && formData.category?.id}
                                        onChange={handleSelect}
                                    >
                                        {
                                            category?.length > 0 && category?.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={'ml-40'}>
                                <Button style={{display: "inline-block"}} className="mr-2" type="submit" variant="outlined">
                                    Tạo
                                </Button>
                            </div>
                        </div>
                        <div>
                            <input name="image" onChange={handleChange} style={{display: "none"}} accept="image/*"
                                   id="contained-button-file" type="file"/>
                            <label style={{display: "block", width: 0}} className="mb-3" htmlFor="contained-button-file">
                                <Button startIcon={<CloudUploadIcon/>} variant="outlined" color="primary"
                                        component="span"> Ảnh </Button>
                            </label>
                        </div>
                        <Button style={{display: "inline-block"}} className="mr-2" type="submit" variant="outlined">
                            Lưu
                        </Button>
                        <Button type="button" onClick={btnClearForm} variant="outlined" color="inherit">
                            Xóa form
                        </Button>
                    </form>

                    <table className="table table-striped table-bordered table-hover shadow">
                        <thead className="thead-dark">
                        <tr>
                            <th>Ảnh</th>
                            <th>Màu</th>
                            <th>Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {product.map(function (value, index) {
                            return (
                                <tr
                                    key={index}
                                >
                                    
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
}

export default FormProduct;