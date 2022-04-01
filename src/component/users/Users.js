import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useState, useEffect, useMemo} from "react";
import {FormControlLabel, IconButton, Modal, Switch} from "@mui/material";
import {FaEllipsisV, FaTrash} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {Dropdown} from "semantic-ui-react";
import {createUser, getAllUser, updateUser} from "../../service/user";
import {storage} from "../firebase/firebase";
import _ from "lodash";

const formDataInItValue = {
    fullName: "",
    phoneNumber: "",
    email: '',
    password: '',
    photo: '',
    role: ''
}
const userImage = "https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png";

function Users() {

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

    useEffect(() => {
        if (!open) {
            setFormData(formDataInItValue)
        }
    }, [open])

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            index: newPage - 1
        });
    };

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
                            photo: url
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

    const handleChangeRole = (event) => {
        setFormData({
            ...formData,
            'role': event.target.value
        })
    }

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (formData.fullName && formData.phoneNumber && formData.email && formData.password && formData.role) {
            dispatch(createUser(formData, res => {
                setListUser([
                    ...listUser,
                    {
                        ...formData,
                        roles: [formData.role === 1 ? 'Admin': (formData.role === 2 ? 'Supper_Admin' : 'Custommer')],
                        isActive: true
                    }
                ])
                setOpen(false)
            }))
        }
    }

    const onChangeActive = (value, e) => {
        let a = window.confirm('Bạn có chắc muốn đổi trạng thái')
        if(a){
            dispatch(updateUser({
                ...value,
                status: e.target.checked,
                isDeleted: 0
            },()=>{
                setListUser(listUser.map(item=>{
                    if(item.id === value.id){
                        item.isActive = !item.isActive
                    }
                    return item
                }))
            }))
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
                }} name="product" className="border rounded p-4 shadow row">
                    <div className="pl-3 pr-5 pt-3 w-auto">
                        <label htmlFor="contained-button-file">
                            <img className="shadow rounded" style={{width: 200}}
                                 src={formData?.photo ? formData.photo : userImage}/>
                        </label>
                    </div>
                    <form onSubmit={onSubmit} autoComplete="off" style={{
                        flex: 1,
                    }}>
                        <TextField
                            required
                            onChange={onChangeHandler}
                            name="fullName"
                            value={formData.fullName}
                            fullWidth
                            label="Tên khách hàng"
                            className="my-2"
                        />
                        <TextField
                            required
                            onChange={onChangeHandler}
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            fullWidth
                            label="Số điện thoại"
                            className="my-2"
                        />
                        <TextField
                            type={'password'}
                            required
                            onChange={onChangeHandler}
                            name="password"
                            value={formData.password}
                            fullWidth
                            label="Mật khẩu"
                            className="my-2"
                        />
                        <TextField
                            required
                            type={'email'}
                            onChange={onChangeHandler}
                            name="email"
                            value={formData.email}
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
                                value={formData?.role}
                                label="role"
                                onChange={handleChangeRole}
                            >
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>Supper_Admin</MenuItem>
                                <MenuItem value={3}>Custommer</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={'mt-2'}>

                            <input name="image" onChange={handleChange} style={{display: "none"}} accept="image/*"
                                   id="contained-button-file" type="file"/>
                            <label style={{display: "block", width: 0}} className="mb-3"
                                   htmlFor="contained-button-file">
                                {/*<Button startIcon={<CloudUploadIcon/>} variant="outlined" color="primary"*/}
                                {/*        component="span"> Ảnh </Button>*/}
                            </label>
                        </div>
                        <Button style={{display: "inline-block"}} className="mr-2" type="submit" variant="outlined">
                            Lưu
                        </Button>
                    </form>
                </div>
            </Modal>
        )
    }, [open, formData])

    return (
        <div className="justify-content-center flex-fill">

            <div className="pt-5 px-5 m-auto">
                <div className={'px-5 pb-4 rounded-bottom'}
                     style={{backgroundColor: '#eeeeee', borderTop: '3px solid'}}>
                    <h3 style={{width: 'fit-content'}} className={'bg-light p-2 rounded-bottom'}>Lọc</h3>
                    <div className={'row'}>
                        <TextField className={'col-3 mr-5'} label={'Tên khách hàng'}/>
                        <TextField className={'col-3 mr-5'} label={'Số điện thoại'}/>
                    </div>
                </div>
            </div>
            {formUser}
            <div className={'px-5 pt-4 d-flex justify-content-end'}>
                <Button onClick={() => {
                    setOpen(true)
                }} color={'primary'} variant={'contained'}>Thêm mới</Button>
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
                        <th>Chức vụ</th>
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
                                <td>
                                    <FormControlLabel label={value.isActive ? "Hoạt động" : "Ngừng hoạt động"}
                                        control={
                                    <Switch checked={value.isActive} onChange={(event)=>{onChangeActive(value, event)}}/>}
                                    />
                                        </td>
                                <td>{value.roles?.[0]}</td>
                                {/*<td>*/}
                                {/*    <Dropdown icon={<IconButton>*/}
                                {/*        <FaEllipsisV size={15}/>*/}
                                {/*    </IconButton>}>*/}
                                {/*        <Dropdown.Menu>*/}
                                {/*            <Dropdown.Item>Cập*/}
                                {/*                nhật</Dropdown.Item>*/}
                                {/*            <Dropdown.Item>Huỷ*/}
                                {/*                đơn</Dropdown.Item>*/}
                                {/*        </Dropdown.Menu>*/}
                                {/*    </Dropdown>*/}
                                {/*</td>*/}
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

export default Users;