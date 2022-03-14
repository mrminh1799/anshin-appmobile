import React, { useEffect, useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Chip, Input } from "@material-ui/core";
import callApi from "../callAPI/apiCaller";
import { storage } from "../firebase/firebase"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from "axios";

function FormUser({
    clickedRow,
    setClickedRow,
    formData,
    setFormData,
    setUser,
    user,
    setLoading,
    formDataInItValue }) {

    const [roles, setRoles] = useState([]);
    const userImage = "https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png";
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        callApi(`role`, "GET", null)
            .then((res) => {
                const { data } = res
                setRoles(data)
                setFormData({
                    ...formData,
                    roles: [data[1]]
                })
            })
    }, [])

    const onCreateProduct = () => {
        setLoading(true)
        callApi(`user/create`, "POST", !formData?.photo ? {
            ...formData,
            photo: userImage
        } : formData)
            .then((response) => {
                const { data } = response
                console.log(formData)
                console.log(data)
                setUser([...user, data]);
                setLoading(false)
            })
    };

    const onUpdateProduct = () => {
        setLoading(true)
        callApi(`product`, "PUT", formData)
            .then((response) => {
                setUser((oldState) => {
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
    const btnClearForm = () => {
        setClickedRow(-1)
        setFormData({
            ...formDataInItValue,
            roles: [roles[1]]
        });
    };
    const handleChange = (event) => {
        if (event?.target?.files[0]) {
            const image = event.target.files[0];
            handleUpload(image);
        }
    }

    const handleSelect = (event) => {
        console.log(event.target);
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleUpload = (image) => {
        setLoading(true)
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
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
                            photo: url
                        })
                        setLoading(false)
                    })
            }
        )
    }
    return (
        <div className="px-5 pt-4">
            <div name="product" className="border rounded p-4 shadow row">
                <div className="pl-3 pr-5 pt-3">
                    <img className="shadow rounded" style={{ width: 200 }} src={formData?.photo ? formData.photo : userImage} />
                </div>
                <form onSubmit={onSubmitHandler} autoComplete="off" style={{ flex: 1 }}>
                    <TextField
                        name="id"
                        value={formData.id}
                        fullWidth
                        label="ID"
                        disabled
                    />
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="username"
                        value={formData.username}
                        fullWidth
                        label="Tài khoản"
                        className="my-2"
                    />
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="password"
                        value={formData.password}
                        fullWidth
                        label="Mật khẩu"
                        className="mb-2"
                        type="password"
                    />
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="name"
                        value={formData.name}
                        fullWidth
                        label="Tên người dùng"
                        className="mb-3"
                    />
                    <TextField
                        required
                        onChange={onChangeHandler}
                        name="email"
                        value={formData.email}
                        fullWidth
                        label="Email"
                        className="mb-3"
                        type="email"
                    />
                    <FormControl fullWidth
                        className="mb-3">
                        <InputLabel id="demo-mutiple-role-label">Chức vụ</InputLabel>
                        <Select
                            required
                            name="roles"
                            labelId="demo-mutiple-role-label"
                            id="demo-mutiple-role"
                            multiple
                            onChange={handleSelect}
                            input={<Input />}
                            MenuProps={MenuProps}
                            value={formData.roles}
                        >
                            {
                            roles.map((value) => {
                                return <MenuItem key={value.id} value={value}>
                                    {value.name}
                                </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <input name="image" onChange={handleChange} style={{ display: "none" }} accept="image/*" id="contained-button-file" type="file" />
                    <label style={{ display: "block", width: 0 }} className="mb-3" htmlFor="contained-button-file">
                        <Button startIcon={<CloudUploadIcon />} variant="outlined" color="primary" component="span"> Ảnh </Button>
                    </label>
                    <Button style={{ display: "inline-block" }} className="mr-2" type="submit" variant="outlined">
                        Lưu
                    </Button>
                    <Button type="button" onClick={btnClearForm} variant="outlined" color="inherit">
                        Xóa form
                    </Button>
                </form>
            </div>
        </div>
    );
}
export default FormUser;