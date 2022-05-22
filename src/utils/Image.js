import React, {useState} from "react";
import {Skeleton} from "@mui/material";


const Image = ({src, style, ...props}) => {
    const [load, setLoad] = useState(false)
    return (
        <>
            {!load && <Skeleton style={{position: "absolute",...style}} {...props}/>}
            <img src={src} onLoad={()=>{
                setLoad(true)
            }} style={style} {...props}/>
        </>

    )
}

export default Image