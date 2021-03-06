import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useMemo, useState} from "react";
import {Modal, Switch} from "@mui/material";
import {useDispatch} from "react-redux";
import {createUser, getAllUser, updateUser} from "../../service/user";
import {storage} from "../firebase/firebase";
import {useConfirm} from "material-ui-confirm";
import {toast} from "react-toastify";

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
    const confirm = useConfirm()
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
                        roles: [formData.role === 1 ? 'Admin' : (formData.role === 2 ? 'Supper_Admin' : 'Custommer')],
                        isActive: true
                    }
                ])
                setOpen(false)
            }))
        }
    }

    const onChangeActive = (value, e) => {
        confirm({
            title: '?????i tr???ng th??i',
            description: "B???n c?? ch???c mu???n ?????i tr???ng th??i?",
        }).then(() => {
            dispatch(updateUser({
                ...value,
                status: e.target.checked,
                isDeleted: 0
            }, () => {
                setListUser(listUser.map(item => {
                    if (item.id === value.id) {
                        item.isActive = !item.isActive
                    }
                    return item
                }))
            }))
            toast.success('?????i tr???ng th??i th??nh c??ng')
        })
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
                            label="T??n kh??ch h??ng"
                            className="my-2"
                        />
                        <TextField
                            required
                            onChange={onChangeHandler}
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            fullWidth
                            label="S??? ??i???n tho???i"
                            className="my-2"
                        />
                        <TextField
                            type={'password'}
                            required
                            onChange={onChangeHandler}
                            name="password"
                            value={formData.password}
                            fullWidth
                            label="M???t kh???u"
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
                            <InputLabel id="demo-simple-select-label">Ch???c v???</InputLabel>
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
                                {/*        component="span"> ???nh </Button>*/}
                            </label>
                        </div>
                        <Button style={{display: "inline-block"}} className="mr-2" type="submit" variant="outlined">
                            L??u
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
                    <h3 style={{width: 'fit-content'}} className={'bg-light p-2 rounded-bottom'}>L???c</h3>
                    <div className={'row'}>
                        <TextField className={'col-3 mr-5'} label={'T??n kh??ch h??ng'}/>
                        <TextField className={'col-3 mr-5'} label={'S??? ??i???n tho???i'}/>
                    </div>
                </div>
            </div>
            {formUser}
            <div className={'px-5 pt-4 d-flex justify-content-end'}>
                <Button onClick={() => {
                    setOpen(true)
                }} color={'primary'} variant={'contained'}>Th??m m???i</Button>
            </div>
            <div className="pt-2 px-5 m-auto">
                <table className="table table-striped table-busered table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>T??n kh??ch h??ng</th>
                        <th>Email</th>
                        <th>S??? ??i???n tho???i</th>
                        <th>Tr???ng th??i</th>
                        <th>Ch???c v???</th>
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
                                <td><Switch checked={value.isActive} onChange={(event) => {
                                    onChangeActive(value, event)
                                }}/>
                                    {value.isActive ? "Ho???t ?????ng" : "Ng???ng ho???t ?????ng"}
                                </td>
                                <td>{value.roles?.[0]}</td>
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