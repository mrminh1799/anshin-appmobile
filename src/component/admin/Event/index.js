import React, {useState} from 'react';
import FormProduct from "../../products/FormProduct";
import ListProduct from "../../products/ListProduct";
import ListEvent from "./ListEvent";
import FormEvent from "./FormEvent";
function Event (){
    const [open, setOpen] = useState(false)
    const [table,setTable] = useState(false)
    const [detailsEvent,setDetailsEvent] = useState(null)
    const [events,setEvents ] = useState(null)


    return(
        <div>
            <FormEvent open={open} detailsEvent={detailsEvent} setEvents={setEvents} setOpen={setOpen} setTable={setTable} table={table}/>
            <ListEvent open={open} events={events} setEvents={setEvents} setOpen={setOpen} setDetailsEvent={setDetailsEvent} setTable={setTable}/>
        </div>
    )
}
export default Event