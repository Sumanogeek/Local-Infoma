import axios from 'axios';
import {returnErrors} from './errorActions';


var host = "http://"+ window.location.hostname;
//var host = "http://ec2-18-216-236-140.us-east-2.compute.amazonaws.com";
//console.log("host: " + host);

//check token & load user
export const loadUser = () => (dispatch, getState, action={type:'USER_LOADING'}) => {
    //User loading
    //dispatch({type: USER_lOADING});
    dispatch({type: action.type});

    //axios.post(host + ':5000/api/auth/user', tokenConfig(getState))
    axios.get(host + ':5000/api/auth/user', tokenConfig(getState))
        //.then(res => console.log("response: " + JSON.stringify(res )))
        .then(res => dispatch({
            type: 'USER_LOADED',
           // type: action.type,
            payload: res.data
        }))
        .catch(err => {
            //console.log("error: " + err);
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: 'AUTH_ERROR'
                //type: action.type
            });
        });

};

// Register User
export const register = ({ name, email, password}) => dispatch => {
    //Header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //Request body
    const body = JSON.stringify({name, email, password});

    axios.post(host + ':5000/api/user', body, config)
        .then (res => 
            dispatch ({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            })
        )
        .catch (err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            );
            dispatch({
                type: 'REGISTER_FAIL'
            });
        });
};

// Login User
export const login = ({ email, password}) => dispatch => {
    //Header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //Request body
    const body = JSON.stringify({ email, password});

    axios.post(host + ':5000/api/auth', body, config)
        .then (res => 
            dispatch ({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            })
        )
        .catch (err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
            );
            dispatch({
                type: 'LOGIN_FAIL'
            });
        });
};

// Logout User
export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    };
};

// Setup config/headers and token
export const tokenConfig = getState => {
    //get token from localstorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    //If token, add to headers
    /* const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTk5NmU1OTU2YTJiMGZhZjgyNzhlNSIsImlhdCI6MTU2NjE4NzQ0OCwiZXhwIjoxNTY2MTkxMDQ4fQ.k95gvzOXG07UTmmE1lcf4J1zfPQEzN0xd_QhZMNJn4Y';
    config.headers['x-auth-token'] = tempToken;     */
    if(token) {
        config.headers['x-auth-token'] = token;    
        //config.headers['x-auth-token'] = tempToken;    
    }

    //console.log("Config: " + JSON.stringify(config) )
    return config;
};

export default register;