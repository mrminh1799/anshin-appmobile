import axios from 'axios';
import * as Config from '../constants/config';

function callApi(endpoint,method,data=null) {
    return(
        axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            data : data
        }).catch((err)=>{
            console.log(err);
        })
    )
}

export default callApi;