import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useState, useEffect, useMemo} from "react";
import {IconButton, Modal} from "@mui/material";
import {FaEllipsisV, FaTrash} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {Dropdown} from "semantic-ui-react";
import { createColor, deleteColor, getAllColor, getColorByIdDelete, updateColor } from "../../service/color";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {storage} from "../firebase/firebase";
import { Label } from "@material-ui/icons";

// import {changeQuantityDetailOrder} from "../../service/order";

const formDataInItValue = {
    colorName: "",
}

function Colors() {

    const dispatch = useDispatch()

    const [color, setColor] = useState([])
   
    const [listColor, setListColor] = useState([])
    const [formData, setFormData] = useState(formDataInItValue);
    const [totalPage, setTotalPage] = useState(1);
    const [pagination, setPagination] = useState({
        index: 0,
        size: 10
    });

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) {
            setFormData(formDataInItValue)
        }
    }, [open])

    useEffect(() => {
        if (listColor) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setColor(listColor.slice(firstIndex, lastIndex))
        }
    }, [listColor])

    useEffect(() => {
        if (listColor) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setTotalPage(Math.ceil(listColor.length / pagination.size))
            setColor(listColor.slice(firstIndex, lastIndex))
        }
    }, [pagination.index])

    useEffect(() => {
        dispatch(getAllColor({}, res => {
            if (res) {
                setTotalPage(Math.ceil(res.length / pagination.size))
                setPagination({
                    ...pagination,
                    index: 0
                })
                setListColor(res)
                setColor(res.slice(0, pagination.size))
            }
        }))
    }, [])

    const handleUpdate = (value) => {
        setOpen(true)
        setFormData({
            ...value,
            update: true
        })
    }
    

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            index: newPage - 1
        });
    };

    const handleDeleteColor = (id) => {
        let a = window.confirm('Bạn có chắc muốn xoá danh mục này?')
        if (a) {
            dispatch(deleteColor({
                id: id,
            }))
            setListColor(listColor.filter(item => item.id !== id))
        }
    }

    const handleSave = (event) => {
        event.preventDefault()
        if (!formData.colorName) return
        if (formData?.update) {
            dispatch(updateColor({
                "id": formData.id,
                "colorName": formData.colorName,
                "isDelete": false
            }, (res) => {
                setListColor([
                    ...listColor.map(item => {
                        if (item.id === res.id) {
                            item.colorName = formData.colorName
                        }
                        return item
                    })
                ])
                setOpen(false)
            }))
        } else {
            dispatch(createColor({
                "colorName": formData.colorName,
                "isDelete": false,
                
            }, (res) => {
                setListColor([
                    ...listColor,
                    {
                        id: res.id,
                        colorName: res.colorName,
                    }
                ])
                setOpen(false)
            }))
        }
    }

    const formColor = () => {
        return (
            <Modal
                keepMounted
                open={open} onClose={() => {
                setOpen(false)
            }} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 300,
                    marginRight: 300,
                }} className="border rounded p-4 shadow" autoComplete="off" onSubmit={handleSave}>
                    <div>
                        <TextField
                            required
                            name="colorName"
                            value={formData.colorName}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    colorName: event.target.value
                                })
                            }}
                            fullWidth
                            label="Tên màu sắc"
                            className="my-2 mb-4"
                        />
                    </div>
                    <div className={'row justify-content-center'}>
                        <Button className="col col-lg-2" type={'submit'}
                                color={'primary'} variant="contained">
                            Lưu
                        </Button>
                    </div>
                </form>
            </Modal>
        )
    }

    return (
        <div className="justify-content-center flex-fill">
            {formColor()}
            
            <div className={'px-5 pt-4 d-flex justify-content-end'}>
                <Button onClick={() => {
                    setOpen(true)
                }} color={'primary'} variant={'contained'}>Thêm mới</Button>
            </div>
            <div className="pt-2 px-5 m-auto">
                <table className="table table-striped table-bcolored table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên màu</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {color.map(function (value, index) {

                        return (
                            <tr
                                key={index}
                            >
                                <td>{((pagination.index + 1) * pagination.size - pagination.size + 1) + index}</td>
                                <td>{value.colorName}</td>
                                <td>{!value.isDelete  ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
                                <td>
                                    <Dropdown icon={<IconButton>
                                        <FaEllipsisV size={15}/>
                                    </IconButton>}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleUpdate(value)}>Cập
                                                nhật</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteColor(value.id)}>Xoá màu</Dropdown.Item>
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

export default Colors;