import React from "react";
import { TextField, Button } from "@material-ui/core";
import callApi from "../callAPI/apiCaller";

function FormCategories({ formDataInItValue,setCategory, category, formData, setFormData, clickedRow, setLoading }) {
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
        setLoading(true)
        callApi(`category`, "PUT", formData)
            .then((response) => {
                setCategory((oldState) => {
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
        <div className="px-5 pt-4">
            <form className="border rounded p-4 shadow" onSubmit={onSubmitHandler} autoComplete="off">
                <TextField
                    onChange={onChangeHandler}
                    name="id"
                    value={formData.id}
                    fullWidth
                    label="ID"
                    disabled  
                />
                <TextField
                    onChange={onChangeHandler}
                    name="name"
                    value={formData.name}
                    fullWidth
                    label="Tên danh mục"
                    className="my-2 mb-4"
                />
                <Button className="mr-2" type="submit" variant="outlined">
                    Lưu
              </Button>
                <Button onClick={btnClearForm} variant="outlined" color="inherit">
                    Xóa form
              </Button>
            </form>
        </div>
    );
}

export default FormCategories;