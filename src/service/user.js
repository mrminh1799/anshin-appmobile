import {createGet} from "./utils";




export const getAllUser = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'all_user','admin/acount/findAll',{}, _callback);
}