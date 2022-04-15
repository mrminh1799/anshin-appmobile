import React, {useEffect, useState} from "react";
import {Button, Switch} from "@material-ui/core";
import {useChangeStatusEvent, useGetAllEvents} from "../../../service/event";


function ListEvent({setOpen, setTable, setDetailsEvent,events, setEvents}) {
    const [currEvent, setCurrEvent] = useState(null)
    const allEvents = useGetAllEvents()
    const changeStatus = useChangeStatusEvent({
        id: currEvent
    })

    function onChangeStatus(item) {
        setCurrEvent(item?.id)
        if(item?.status ===true){
            item.status=false
        }else {
            item.status=true
        }
    }

    function showModalDetailEvent(e) {
        setDetailsEvent(e)
        setOpen(true)
        setTable(true)
    }

    useEffect(() => {
        if(currEvent){
            changeStatus.refetch()
            setCurrEvent(null)
        }
    },[currEvent])

    useEffect(() => {
        allEvents.refetch()
    }, [])
    useEffect(() => {
        setEvents(allEvents?.data)
    }, [allEvents.data])
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


                {
                    events?.map((item, i) => {
                        return (
                            <tr>
                                <td>{item?.id}</td>
                                <td>{item?.nameEvent}</td>
                                <td>{item?.startTime}</td>
                                <td>{item?.endTime}</td>
                                <td><Switch onChange={() => onChangeStatus(item)} checked={item?.status}/></td>
                                <td>
                                    <Button
                                        onClick={() => showModalDetailEvent(item)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Chi tiết
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }


                </tbody>
            </table>
        </div>
    )
}

export default ListEvent;