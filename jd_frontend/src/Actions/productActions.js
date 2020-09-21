import * as Action_type from './actionTypes';
import axios from 'axios';


export const destroyProduct = id => dispatch => {
    axios.post(`/product/${id}`)
        .then(res => dispatch({
            type: Action_type.DELETE_PRODUCT,
            payload:res.data
        }))
        .catch(err => console.log(err));
}

export const getAllProduct = (page , limit) => dispatch => {
    axios.get(`/product?page=${page}&limit=${limit}`)
        .then(res => dispatch({
            type: Action_type.GET_PRODUCT,
            payload:res.data
        }))
        .catch(err => console.log(err));
}

export const AddProduct = (data) => dispatch => {
    axios.post(`/product`, data)
        .then(res =>
            dispatch({
            type: Action_type.ADD_PRODUCTS,
            payload:res.data
            })
        )
        .catch(err => console.log(err));
}