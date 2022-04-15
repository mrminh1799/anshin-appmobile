import {createDelete,createGet, createPost, createPut} from "./utils";


export const getAllSizes = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'size', 'size/findByIsdeleteSize', {}, _callback);
}

export const deleteSize = (params, _callback) => async dispatch => {
    await createDelete(dispatch, 'delete_size', 'size/'+ params.id, _callback);
}

export const createSize = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'create_size', 'size/create', params, _callback);
}

export const updateSize = (params, _callback) => async dispatch => {
    await createPut(dispatch, 'update_size', 'size/' + params.id, params, _callback);
}
