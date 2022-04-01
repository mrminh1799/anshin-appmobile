import React, {useEffect} from "react";
import {Button, Switch} from "@material-ui/core";
import {ToggleButton} from "@mui/material";


function ListEvent({setOpen, setTable }) {

    return (
        <div className="pt-5 px-5 m-auto">
            <table className="table table-striped table-bordered table-hover shadow">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Tên sự kiện</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Trạng thái</th>
                    <th>Tuỳ chọn</th>
                </tr>
                </thead>
                <tbody>

                        <tr>
                            <td>1</td>
                            <td>Ten su kien</td>
                            <td>1/1/1111</td>
                            <td>1/1/1111</td>
                            <td><Switch  defaultChecked /></td>
                            <td>
                                <Button
                                    onClick={() =>{
                                        setOpen(true)
                                        setTable(true)
                                    }}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Chi tiết
                                </Button>
                            </td>
                        </tr>

                </tbody>
            </table>
        </div>
    )
}
export default ListEvent;