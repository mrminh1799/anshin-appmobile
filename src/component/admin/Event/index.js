import React, {useState} from 'react';
import FormProduct from "../../products/FormProduct";
import ListProduct from "../../products/ListProduct";
import ListEvent from "./ListEvent";
import FormEvent from "./FormEvent";
function Event (){
    const [open, setOpen] = useState(false)
    const [table,setTable] = useState(false)
    return(
        <div>
            <FormEvent open={open} setOpen={setOpen} setTable={setTable} table={table}/>
            <ListEvent open={open} setOpen={setOpen} setTable={setTable}/>
        </div>
    )
}
export default Event