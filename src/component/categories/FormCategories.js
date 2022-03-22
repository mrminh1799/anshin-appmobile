import React, {useState} from "react";
import { TextField, Button } from "@material-ui/core";
import callApi from "../callAPI/apiCaller";
import {Box, Chip, FormControl, InputLabel, OutlinedInput, Select, MenuItem, useTheme, Modal} from "@mui/material";
import {useGetProducts} from "../../service/product";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function FormCategories({ formDataInItValue,setCategory, category, formData, setFormData, clickedRow, setLoading }) {

    const [open, setOpen] = useState(false)

    const product = useGetProducts()

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const onCreateCategory = () => {
        setLoading(true)
        callApi("category", "POST", formData)
            .then((response) => {
                const { data } = response
                setCategory([...category, data]);
                setLoading(false)
            })
    };

    const onUpdateCategory = () => {
        // setLoading(true)
        // callApi(`category`, "PUT", formData)
        //     .then((response) => {
        //         setCategory((oldState) => {
        //             let newState = oldState.map((value, index) => {
        //                 return index == clickedRow ? formData : value;
        //             });
        //             return newState;
        //         });
        //         setLoading(false)
        //     })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (clickedRow != -1) {
            onUpdateCategory();
        } else {
            onCreateCategory();
        }
        btnClearForm()
    };
    const btnClearForm = (event) => {
        clickedRow = -1;
        setFormData(formDataInItValue)
    };
    return (
        <div>
            <Box>
                <Button variant={'contained'} onClick={()=>setOpen(true)}>Tạo đơn</Button>
            </Box>
            <Modal
                keepMounted
                open={open} onClose={()=>{setOpen(false)}} className="px-5 pt-4">
                <form style={{
                    backgroundColor: 'white',
                    marginLeft: 100,
                    marginRight: 100,
                }} className="border rounded p-4 shadow" onSubmit={onSubmitHandler} autoComplete="off">
                    {/*<TextField*/}
                    {/*    onChange={onChangeHandler}*/}
                    {/*    name="id"*/}
                    {/*    value={formData.id}*/}
                    {/*    fullWidth*/}
                    {/*    label="ID"*/}
                    {/*    disabled*/}
                    {/*/>*/}
                    <TextField
                        onChange={onChangeHandler}
                        name="name"
                        value={formData.name}
                        fullWidth
                        label="Tên khách hàng"
                        className="my-2 mb-4"
                    />
                    <TextField
                        onChange={onChangeHandler}
                        name="name"
                        value={formData.name}
                        fullWidth
                        label="Số điện thoại"
                        className="my-2 mb-4"
                    />
                    <TextField
                        onChange={onChangeHandler}
                        name="name"
                        value={formData.name}
                        fullWidth
                        label="Địa chỉ"
                        className="my-2 mb-4"
                    />
                    <FormControl variant={'standard'} sx={{ m: 1, width: '100%'}}>
                        <InputLabel id="demo-multiple-chip-label">Sản phẩm</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {product?.data?.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    value={item.name}
                                    // style={getStyles(name, personName, theme)}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button className="mr-2" type="submit" variant="outlined">
                        Lưu
                    </Button>
                    <Button onClick={btnClearForm} variant="outlined" color="inherit">
                        Xóa form
                    </Button>
                </form>
            </Modal>
        </div>
    );
}

export default FormCategories;