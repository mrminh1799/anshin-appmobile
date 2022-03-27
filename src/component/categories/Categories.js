import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useState, useEffect, useMemo} from "react";
import {IconButton, Modal} from "@mui/material";
import {FaEllipsisV, FaTrash} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {Dropdown} from "semantic-ui-react";
import {getAllUser} from "../../service/user";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {storage} from "../firebase/firebase";

const formDataInItValue = {
    fullName: "",
    address: "",
    detailAddress: "",
    phoneNumber: "",
    sumPrice: '',
    timeCreate: ""
}

function Categories() {

    const dispatch = useDispatch()

    const [user, setUser] = useState([])
    const [listUser, setListUser] = useState([])
    const [formData, setFormData] = useState(formDataInItValue);
    const [totalPage, setTotalPage] = useState(1);
    const [pagination, setPagination] = useState({
        index: 0,
        size: 10
    });

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (listUser) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setUser(listUser.slice(firstIndex, lastIndex))
        }
    }, [listUser])

    useEffect(() => {
        if (listUser) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setTotalPage(Math.ceil(listUser.length / pagination.size))
            setUser(listUser.slice(firstIndex, lastIndex))
        }
    }, [pagination.index])

    useEffect(() => {
        dispatch(getAllUser({}, res => {
            if (res) {
                setTotalPage(Math.ceil(res.length / pagination.size))
                setPagination({
                    ...pagination,
                    index: 0
                })
                setListUser(res)
                setUser(res.slice(0, pagination.size))
            }
        }))
    }, [])

    // const handleUpdate = (value) => {
    //     dispatch(getDetailUser({
    //         userId: value.id
    //     }, (res) => {
    //         setDetailUser(res)
    //         setOpen(true)
    //         setFormData(value)
    //     }))
    // }

    // const handleCancelUser = (id) => {
    //     let a = window.confirm('Bạn có chắc muốn huỷ đơn?')
    //     if (a) {
    //         setOpen(false)
    //         dispatch(changeStatus({
    //             id: id,
    //             status: 0
    //         }))
    //         setListUser(listUser.filter(item => item.id !== id))
    //     }
    // }

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            index: newPage - 1
        });
    };

    // const handleDeleteUserDetail = (id) => {
    //     let a = window.confirm('Bạn có chắc muốn xoá đơn này?')
    //     if (a) {
    //         dispatch(deleteUserDetail({
    //             userDetailId: id,
    //         }))
    //         setDetailUser(detailUser.filter(item => item.idUserDetail !== id))
    //     }
    // }

    // const onChangeQuantity = (id, quantity) => {
    //     if (quantity.target.value > 0) {
    //         setDetailUser(detailUser.map(item => {
    //             if (item.idUserDetail === id) {
    //                 item.quantity = quantity.target.value
    //             }
    //             return item
    //         }))
    //     }
    // }

    // const handleConfirmUser = (id) => {
    //     let a = window.confirm('Bạn có chắc muốn xác nhận đơn?')
    //     if (a) {
    //         setOpen(false)
    //         dispatch(changeStatus({
    //             id: id,
    //             status: 2
    //         }))
    //         setListUser(listUser.filter(item => item.id !== id))
    //     }
    // }

    // const handleSuccess = (id) => {
    //     dispatch(changeStatus({
    //         id: id,
    //         status: 3
    //     }))
    //     setListUser(listUser.filter(item => item.id !== id))
    // }
    //
    // const handleFail = (id) => {
    //     dispatch(changeStatus({
    //         id: id,
    //         status: 0
    //     }))
    //     setListUser(listUser.filter(item => item.id !== id))
    // }

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
                        console.log(url)
                        setFormData({
                            ...formData,
                            image: url
                        })
                    })
            }
        )
    }

    const handleChange = (event) => {
        if (event?.target?.files[0]) {
            const image = event.target.files[0];
            handleUpload(image);
        }
    }

    const formUser = useMemo(() => {
        return (
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
                    marginLeft: 300,
                    marginRight: 300,
                }}  name="product" className="border rounded p-4 shadow row">
                    <div className="pl-3 pr-5 pt-3 w-auto">
                        <label htmlFor="contained-button-file">
                            <img className="shadow rounded" style={{width: 200}}
                                 src={formData?.image ? formData.image : productImage}/>
                        </label>
                    </div>
                    <form autoComplete="off" style={{
                        flex: 1,
                    }}>
                        <TextField
                            required
                            // onChange={onChangeHandler}
                            name="name"
                            value={formData.name}
                            fullWidth
                            label="Tên khách hàng"
                            className="my-2"
                        />
                        <TextField
                            required
                            // onChange={onChangeHandler}
                            name="price"
                            value={formData.price}
                            fullWidth
                            label="Số điện thoại"
                            className="my-2"
                        />
                        <TextField
                            required
                            // onChange={onChangeHandler}
                            name="avaiable"
                            value={formData.avaiable}
                            fullWidth
                            label="Email"
                            className="my-2"
                        />
                        <FormControl fullWidth
                                     className="my-2">
                            <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Age"
                                // onChange={handleChange}
                            >
                                <MenuItem value={10}>Admin</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={'mt-2'}>
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
                        <Button type="button" variant="outlined" color="inherit">
                            Xóa form
                        </Button>
                    </form>
                </div>
            </Modal>
        )
    }, [open, formData])

    return (
        <div className="justify-content-center flex-fill">

            <div className="pt-5 px-5 m-auto">
                <div className={'px-5 pb-4 rounded-bottom'} style={{backgroundColor: '#eeeeee', buserTop: '3px solid'}}>
                    <h3 style={{width: 'fit-content'}} className={'bg-light p-2 rounded-bottom'}>Lọc</h3>
                    <div className={'row'}>
                        <TextField className={'col-3 mr-5'} label={'Tên khách hàng'}/>
                        <TextField className={'col-3 mr-5'} label={'Số điện thoại'}/>
                    </div>
                </div>
            </div>
            {formUser}
            <div className={'px-5 pt-4 d-flex justify-content-end'}>
                <Button onClick={()=>{setOpen(true)}} color={'primary'} variant={'contained'}>Thêm mới</Button>
            </div>
            <div className="pt-2 px-5 m-auto">
                <table className="table table-striped table-busered table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.map(function (value, index) {

                        return (
                            <tr
                                key={index}
                            >
                                <td>{((pagination.index + 1) * pagination.size - pagination.size + 1) + index}</td>
                                <td>{value.fullName}</td>
                                <td>{value.email}</td>
                                <td>{value.phoneNumber}</td>
                                <td>{value.isActive ? "Hoạt động" : "Ngừng hoạt động"}</td>
                                <td>
                                    <Dropdown icon={<IconButton>
                                        <FaEllipsisV size={15}/>
                                    </IconButton>}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Cập
                                                nhật</Dropdown.Item>
                                            <Dropdown.Item >Huỷ
                                                đơn</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <Pagination
                page={pagination.index + 1}
                count={totalPage}
                onChange={onChangePage}
                className="py-4 d-flex justify-content-center"
            />
        </div>
    )
}

export default Categories;