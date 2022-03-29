import {createDelete, createGet, createPost, createPut} from "./utils";


export const getAllChildCategory = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'child_category', 'admin/Categories/findByCon', {}, _callback);
}

export const getAllCategory = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'category', 'admin/Categories/findAllByCategoryParentId', {}, _callback);
}

export const deleteCategory = (params, _callback) => async dispatch => {
    await createDelete(dispatch, 'delete_category', 'admin/Categories/'+ params.id, {}, _callback);
}

export const createCategory = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'create_category', 'admin/Categories/create', params, _callback);
}

export const updateCategory = (params, _callback) => async dispatch => {
    await createPut(dispatch, 'update_category', 'admin/Categories/' + params.id, params, _callback);
}