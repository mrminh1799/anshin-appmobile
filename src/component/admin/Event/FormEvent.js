import React, {useEffect, useState} from "react";
import {TextField, Button, Select, MenuItem, InputLabel, FormControl} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from "axios";
import {Box, Chip, Modal} from "@mui/material";

function FormEvent({
                       clickedRow,
                       setClickedRow,
                       formData,
                       setFormData,
                       table,
                       setOpen,
                       setLoading,
                       open,
                       setTable

                   }) {

    const [openAddPr, setOpenAddPr] = useState(false)

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
    };

    const onUpdateProduct = () => {
        setLoading(true)

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
        // setFormData({
        //     ...formDataInItValue,
        //     category: category[0]
        // });
    };




    return (
        <div>
            <Box>
                <Button variant={'contained'} onClick={() => setOpen(true)}>Tạo sản phẩm</Button>
            </Box>
            <Modal
                style={{
                    overflow: "scroll"
                }}
                keepMounted
                open={open} onClose={() => {
                setOpen(false)
                setTable(false)
            }} className="px-5 pt-4">
                <div style={{
                    backgroundColor: 'white',
                    marginLeft: 300,
                    marginRight: 300,
                }} name="product" className="border rounded p-4 shadow row">

                    <form onSubmit={onSubmitHandler} autoComplete="off" style={{flex: 1}}>
                        <TextField
                            required
                            onChange={onChangeHandler}
                            name="name"
                            disabled={table?true:false}
                            // value={formData.name}
                            fullWidth
                            label="Tên sự kiện"
                            className="my-2"
                        />
                        <TextField
                            required
                            onChange={onChangeHandler}
                            name="price"
                            // value={formData.price}
                            fullWidth
                            label="Ngày bắt đầu"
                            className="mb-2"
                            type="number"
                        />
                        <TextField
                            required
                            onChange={onChangeHandler}
                            name="avaiable"
                            // value={formData.avaiable}
                            fullWidth
                            label="Ngày kết thúc"
                            className="mb-3"
                            type="number"
                        />

                        <Button style={{display: "inline-block"}} className="mr-2"  variant="outlined">
                            Tạo Sự kiện
                        </Button>
                        <Button style={{display: "inline-block"}} onClick={() => setOpenAddPr(true)} className="mr-2" variant="outlined">
                            Thêm sản phẩm giảm giá
                        </Button>
                        <Button style={{display: "inline-block"}} className="mr-2" variant="outlined">
                            Cập nhật
                        </Button>
                        <Button type="button" variant="outlined" color="inherit">
                            Quay lại
                        </Button>
                    </form>
                    {
                        table?
                            <table style={{marginTop:20}} className="table table-striped table-bordered table-hover shadow">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Màu</th>
                                    <th>Số lượng</th>
                                    <th>Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr>
                                    <td className="text-center">s</td>
                                    <td>s</td>
                                    <td>s$</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                            :
                            <></>
                    }

                </div>
            </Modal>
            <Modal
                style={{
                    overflow: "scroll"
                }}
                keepMounted
                open={openAddPr} onClose={() => {
                setOpenAddPr(false)
            }} className="px-5 pt-4">
                <div style={{
                    backgroundColor: 'white',
                    marginLeft: 600,
                    marginRight: 600,
                }} name="product" className="border rounded p-4 shadow row">

                <form onSubmit={onSubmitHandler} autoComplete="off" style={{flex: 1}}>
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="name"
                        // value={formData.name}
                        fullWidth
                        label="Tên sản phẩm"
                        className="my-2"
                    />
                    <div>

                        <FormControl style={{width: 200}}>
                            <InputLabel id="demo-simple-select-label">Hình thức giảm giá</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                            >

                                            <MenuItem >item.colorName</MenuItem>


                            </Select>
                        </FormControl>
                    </div>

                      <TextField
                          required
                          onChange={onChangeHandler}
                          name="name"
                          // value={formData.name}
                          fullWidth
                          label="Giảm giá"
                          className="my-2"
                      />


                    <Button style={{display: "inline-block"}} className="mr-2"  variant="outlined">
                       Xong
                    </Button>
                    <Button style={{display: "inline-block"}} onClick={() => setOpenAddPr(false)} className="mr-2" variant="outlined">
                       Huỷ
                    </Button>
                </form>
                </div>
            </Modal>
        </div>
    );
}

export default FormEvent;