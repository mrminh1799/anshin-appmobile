import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {IconButton, Modal} from "@mui/material";
import {FaEllipsisV} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {Dropdown} from "semantic-ui-react";
import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getAllChildCategory,
    updateCategory
} from "../../service/category";
import {useConfirm} from "material-ui-confirm";
import {toast} from "react-toastify";

const formDataInItValue = {
    name: "",
}

function CategoryChild() {

    const dispatch = useDispatch()
    const confirm = useConfirm()
    const [currentCate, setCurrentCate] = useState({id: '', name: ''})
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
            setCurrentCate({id: '', name: ''})
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
        dispatch(getAllCategory({}, (res) => {
            setDadCategory(res)
        }))
        dispatch(getAllChildCategory({}, res => {
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
        setCurrentCate(dadCategory.find(item => item?.id === value.parentId))
    }

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            index: newPage - 1
        });
    };

    const handleDeleteCategory = (id) => {
        confirm({
            title: 'Xo?? danh m???c',
            description: "B???n c?? ch???c mu???n xo?? danh m???c n??y?",
        }).then(() => {
            dispatch(deleteCategory({
                id: id,
            }))
            setListCategory(listCategory.filter(item => item.id !== id))
        })
    }

    const handleSave = (event) => {
        event.preventDefault()
        if (!currentCate?.id || !formData.name) return
        if (formData?.update) {
            dispatch(updateCategory({
                "id": formData.id,
                "categoryName": formData.name,
                "categoryParentId": currentCate.id,
                "deleted": false
            }, (res) => {
                setListCategory([
                    ...listCategory.map(item => {
                        if (item.id === res.id) {
                            item.name = formData.name
                            item.parentId = currentCate.id
                            item.parentName = currentCate.name
                        }
                        return item
                    })
                ])
                setOpen(false)
                toast.success('C???p nh???t th??nh c??ng')
            }))
        } else {
            dispatch(createCategory({
                "categoryName": formData.name,
                "categoryParentId": currentCate.id,
                "deleted": false
            }, (res) => {
                setListCategory([
                    ...listCategory,
                    {
                        id: res.id,
                        name: res.categoryName,
                        parentId: currentCate.id,
                        parentName: currentCate.name
                    }
                ])
                setOpen(false)
                toast.success('Th??m m???i th??nh c??ng')
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
                        <h4 className={'mb-0'}>{formData?.update? 'C???p nh???t' : "Th??m m???i" } danh m???c</h4>
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
                            label="T??n danh m???c con"
                            className="my-2 mb-4"
                        />
                    </div>
                    <FormControl fullWidth
                                 className="my-2 mb-4">
                        <InputLabel required id="demo-simple-select-label">Danh m???c cha</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentCate?.id ? currentCate : ''}
                            defaultValue={''}
                            label="Danh m???c cha"
                            onChange={(item) => {
                                setCurrentCate(item.target.value)
                            }}
                        >
                            {
                                dadCategory.map(item => <MenuItem value={item}>{item.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <div className={'row justify-content-center'}>
                        <Button className="col col-lg-2" type={'submit'}
                                color={'primary'} variant="contained">
                            L??u
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
                    <h3 style={{width: 'fit-content'}} className={'bg-light p-2 rounded-bottom'}>L???c</h3>
                    <div className={'row'}>
                        <TextField className={'col-3 mr-5'} label={'T??n kh??ch h??ng'}/>
                        <TextField className={'col-3 mr-5'} label={'S??? ??i???n tho???i'}/>
                    </div>
                </div>
            </div>
            <div className={'px-5 pt-4 d-flex justify-content-end'}>
                <Button onClick={() => {
                    setOpen(true)
                }} color={'primary'} variant={'contained'}>Th??m m???i</Button>
            </div>
            <div className="pt-2 px-5 m-auto">
                <table className="table table-striped table-bcategoryed table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>T??n danh m???c con</th>
                        <th>T??n danh m???c cha</th>
                        <th>Tr???ng th??i</th>
                        <th>H??nh ?????ng</th>
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
                                <td>{value.parentName}</td>
                                <td>{!value.deleted ? "??ang b??n" : "Ng???ng b??n"}</td>
                                <td>
                                    <Dropdown icon={<IconButton>
                                        <FaEllipsisV size={15}/>
                                    </IconButton>}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleUpdate(value)}>C???p
                                                nh???t</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteCategory(value.id)}>Xo?? danh
                                                m???c</Dropdown.Item>
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

export default CategoryChild;