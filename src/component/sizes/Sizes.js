import {Button, TextField} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {IconButton, Modal} from "@mui/material";
import {FaEllipsisV} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {Dropdown} from "semantic-ui-react";
import {createSize, deleteSize, getAllSizes, updateSize} from "../../service/size";
import {useConfirm} from "material-ui-confirm";
import {toast} from "react-toastify";

// import {changeQuantityDetailOrder} from "../../service/order";

const formDataInItValue = {
    size_name: "",
}

function Sizes() {

    const dispatch = useDispatch()

    const [size, setSize] = useState([])

    const [listSize, setListSize] = useState([])
    const [formData, setFormData] = useState(formDataInItValue);
    const [totalPage, setTotalPage] = useState(1);
    const [pagination, setPagination] = useState({
        index: 0,
        size: 10
    });
    const confirm = useConfirm()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) {
            setFormData(formDataInItValue)
        }
    }, [open])

    useEffect(() => {
        if (listSize) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setSize(listSize.slice(firstIndex, lastIndex))
        }
    }, [listSize])

    useEffect(() => {
        if (listSize) {
            let lastIndex = (pagination.index + 1) * pagination.size
            let firstIndex = lastIndex - pagination.size
            setTotalPage(Math.ceil(listSize.length / pagination.size))
            setSize(listSize.slice(firstIndex, lastIndex))
        }
    }, [pagination.index])

    useEffect(() => {
        dispatch(getAllSizes({}, res => {
            if (res) {
                setTotalPage(Math.ceil(res.length / pagination.size))
                setPagination({
                    ...pagination,
                    index: 0
                })
                setListSize(res)
                setSize(res.slice(0, pagination.size))
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

    const handleDeleteSize = (id) => {
        confirm({
            title: 'Xo?? size',
            description: "B???n c?? ch???c mu???n xo?? size n??y?",
        }).then(() => {
            dispatch(deleteSize({
                id: id,
            }))
            setListSize(listSize.filter(item => item.id !== id))
            toast.success('Xo?? th??nh c??ng')
        })
    }

    const handleSave = (event) => {
        event.preventDefault()
        if (!formData.size_name) return
        if (formData?.update) {
            dispatch(updateSize({
                "id": formData.id,
                "size_name": formData.size_name,
                "isDelete": false
            }, (res) => {
                setListSize([
                    ...listSize.map(item => {
                        if (item.id === res.id) {
                            item.size_name = formData.size_name
                        }
                        return item
                    })
                ])
                setOpen(false)
                toast.success('C???p nh???t th??nh c??ng')
            }))
        } else {
            dispatch(createSize({
                "size_name": formData.size_name,
                "isDelete": false,

            }, (res) => {
                setListSize([
                    ...listSize,
                    {
                        id: res.id,
                        size_name: res.size_name,
                    }
                ])
                setOpen(false)
                toast.success('Th??m m???i th??nh c??ng')
            }))
        }
    }

    const formSize = () => {
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
                            name="size_name"
                            value={formData.size_name}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    size_name: event.target.value
                                })
                            }}
                            fullWidth
                            label="T??n size"
                            className="my-2 mb-4"
                        />
                    </div>
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
            {formSize()}
            {/* <div className="pt-5 px-5 m-auto">
                <div className={'px-5 pb-4 rounded-bottom'}
                     style={{backgroundColor: '#eeeeee', borderTop: '3px solid'}}>
                    <h3 style={{width: 'fit-content'}} className={'bg-light p-2 rounded-bottom'}>L???c</h3>
                    <div className={'row'}>
                        <label className={'col-3 mr-5'} name='isdelete' >Tr???ng th??i</label>
                        <select id = "dropdown" onChange = {handleIsdelete}>
                            <option  value="0">Ng???ng ho???t ?????ng</option>
                            <option value="1"> ??ang Ho???t ?????ng</option>               
                        </select>
                         
                    </div>
                </div>
            </div> */}
            <div className={'px-5 pt-4 d-flex justify-content-end'}>
                <Button onClick={() => {
                    setOpen(true)
                }} color={'primary'} variant={'contained'}>Th??m m???i</Button>
            </div>
            <div className="pt-2 px-5 m-auto">
                <table className="table table-striped table-bcolored table-hover shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>T??n k??ch th?????c</th>
                        <th>Tr???ng th??i</th>
                        <th>H??nh ?????ng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {size.map(function (value, index) {

                        return (
                            <tr
                                key={index}
                            >
                                <td>{((pagination.index + 1) * pagination.size - pagination.size + 1) + index}</td>
                                <td>{value.size_name}</td>
                                <td>{!value.isDelete ? "??ang ho???t ?????ng" : "Ng???ng ho???t ?????ng"}</td>
                                <td>
                                    <Dropdown icon={<IconButton>
                                        <FaEllipsisV size={15}/>
                                    </IconButton>}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleUpdate(value)}>C???p
                                                nh???t</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteSize(value.id)}>Xo?? k??ch
                                                th?????c</Dropdown.Item>
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

export default Sizes;