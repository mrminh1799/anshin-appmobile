import {createGet, createPost, createPut} from "./utils";




export const getAllUser = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'all_user','admin/acount/findAll',{}, _callback);
}
export const createUser = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'create_user','admin/acount/createAdminAcount/'+ params.role +'/admin',params, _callback);
}
export const updateUser = (params, _callback) => async dispatch => {
    await createPut(dispatch, 'update_user','admin/acount/updateAcount/'+ String(params.status),params, _callback);
}