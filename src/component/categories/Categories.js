import {Button, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {IconButton, Modal} from "@mui/material";
import {FaEllipsisV} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {Dropdown} from "semantic-ui-react";
import {createCategory, deleteCategory, getAllCategory, updateCategory} from "../../service/category";
import {toast} from "react-toastify";
import {useConfirm} from "material-ui-confirm";

const formDataInItValue = {
    name: "",
}

function Categories() {

    const dispatch = useDispatch()
    const confirm = useConfirm();
    const [category, setCategory] = useState([])
    const [dadCategory, setDadCategory] = useState([])
    const [listCategory, setListCategory] = useState([])
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
        if (listCategory) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setCategory(listCategory.slice(firstIndex, lastIndex))
        }
    }, [listCategory])

    useEffect(() => {
        if (listCategory) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setTotalPage(Math.ceil(listCategory.length / pagination.size))
            setCategory(listCategory.slice(firstIndex, lastIndex))
        }
    }, [pagination.index])

    useEffect(() => {
        dispatch(getAllCategory({}, res => {
            if (res) {
                setTotalPage(Math.ceil(res.length / pagination.size))
                setPagination({
                    ...pagination,
                    index: 0
                })
                setListCategory(res)
                setCategory(res.slice(0, pagination.size))
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

    const handleDeleteCategory = (id) => {
        confirm({
            title: 'Xoá danh mục',
            description: "Bạn có chắc muốn xoá danh mục này?",
        }).then(() => {
            dispatch(deleteCategory({
                id: id,
            }))
            setListCategory(listCategory.filter(item => item.id !== id))
        })
    }

    const handleSave = (event) => {
        event.preventDefault()
        if (!formData.name) {
            toast.warn('Không được bỏ trống tên')
            return
        }
        if (formData?.update) {
            dispatch(updateCategory({
                "id": formData.id,
                "categoryName": formData.name,
                "categoryParentId": 0,
                "deleted": false
            }, (res) => {
                setListCategory([
                    ...listCategory.map(item => {
                        if (item.id === res.id) {
                            item.name = formData.name
                        }
                        return item
                    })
                ])
                setOpen(false)
                toast.success('Cập nhật thành công')
            }))
        } else {
            dispatch(createCategory({
                "categoryName": formData.name,
                "deleted": false,
                "categoryParentId": 0,
            }, (res) => {
                setListCategory([
                    ...listCategory,
                    {
                        id: res.id,
                        name: res.categoryName,
                    }
                ])
                setOpen(false)
                toast.success('Thêm mới thành công')
            }))
        }
    }

    const formCategory = () => {
        return (
            <Modal
                keepMounted
                open={open} onClose={() => {
                setOpen(false)
            }} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 400,
                    marginRight: 400,
                }} className="border rounded p-4 shadow" autoComplete="off" onSubmit={handleSave}>
                    <div className={'py-2 d-flex justify-content-between align-items-center'}
                         style={{borderBottom: '1px solid black'}}>
                        <h4 className={'mb-0'}>{formData?.update? 'Cập nhật' : "Thêm mới" } danh mục</h4>
                        <Button style={{fontSize: 15}} onClick={() => {
                            setOpen(false)
                        }}>X</Button>
                    </div>
                    <div>
                        <TextField
                            required
                            name="name"
                            value={formData.name}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    name: event.target.value
                                })
                            }}
                            fullWidth
                            label="Tên danh mục"
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
            {formCategory()}
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
            <div className={'px-5 pt-4 d-flex justify-content-end'}>
                <Button onClick={() => {
                    setOpen(true)
                }} color={'primary'} variant={'contained'}>Thêm mới</Button>
            </div>
            <div className="pt-2 px-5 m-auto">
                <table className="table table-striped table-bcategoryed table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên danh mục</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {category.map(function (value, index) {

                        return (
                            <tr
                                key={index}
                            >
                                <td>{((pagination.index + 1) * pagination.size - pagination.size + 1) + index}</td>
                                <td>{value.name}</td>
                                <td>{!value.deleted ? "Đang bán" : "Ngừng bán"}</td>
                                <td>
                                    <Dropdown icon={<IconButton>
                                        <FaEllipsisV size={15}/>
                                    </IconButton>}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleUpdate(value)}>Cập
                                                nhật</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteCategory(value.id)}>Xoá danh
                                                mục</Dropdown.Item>
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