import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

var host = "http://"+ window.location.hostname;
//var host = "http://ec2-18-216-236-140.us-east-2.compute.amazonaws.com";
//console.log("host: " + host);

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get(host + ':5000/api/items')
        .then(res =>
            dispatch({
                type: 'GET_ITEMS',
                payload: res.data
            }
        ))
        .catch (err => {
            dispatch(
                returnErrors(err.response.data, err.response.status)
            );
        });
};

export const addItem = item => (dispatch, getState) => {
    axios
        .post(host + ':5000/api/items', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: 'ADD_ITEM',
                payload: res.data
            }
        )
    )   .catch (err => {
        dispatch(
            returnErrors(err.response.data, err.response.status)
        );
    });
};

export const deleteItem = id => (dispatch, getState) => {
    axios
        .delete(host+`:5000/api/items/${id}`, tokenConfig(getState))
        //.delete(host+`:5000/api/items/${id}`)
        .then(res => 
            dispatch ({
                type: 'DELETE_ITEM',
                payload: id
            }
        )
    )   .catch (err => {
        dispatch(
            returnErrors(err.response.data, err.response.status)
        );
    });
};

export const setItemsLoading = () => {
    return {
        type: 'ITEMS_LOADING'
    };
};
