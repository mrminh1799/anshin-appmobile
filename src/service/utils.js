import {apiCallErrorAction, beginCallApi, endCallApi} from "../store/common/actions/ApiCallAction";
import {_get, _post} from "../component/callAPI";

export const createPost = async (dispatch, key, _url, _params, _callback = () => {
}) => {
    dispatch(beginCallApi(_url, _params))
    try {
        let response = await _post(_url, _params)
        dispatch(endCallApi(key, response)).then(()=>{
            _callback(response);
        })
    } catch (err) {
        dispatch(apiCallErrorAction(err))
    }
}

export const createGet = async (dispatch, key, _url, _params, _callback = () => {
}) => {
    dispatch(beginCallApi(_url, _params))
    try {
        let response = await _get(_url, _params)
        console.log('123',response)
        dispatch(endCallApi(key, response)).then(()=>{
            _callback(response);
        })
    } catch (err) {
        dispatch(apiCallErrorAction(err))
    }
}