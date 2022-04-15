import {createDelete,createGet, createPost, createPut} from "./utils";


export const getAllColor = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'color', 'color/findByIsdeleteColor', {}, _callback);
}



export const deleteColor = (params, _callback) => async dispatch => {
    await createDelete(dispatch, 'delete_color', 'color/'+ params.id,{}, _callback);
}

export const createColor = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'create_color', 'color/create', params, _callback);
}

export const updateColor = (params, _callback) => async dispatch => {
    await createPut(dispatch, 'update_color', 'color/' + params.id, params, _callback);
}
