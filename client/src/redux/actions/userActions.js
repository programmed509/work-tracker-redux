import {
    LOAD_USERS,
    LOGOUT,
    USER_ERROR,
    REGISTER,
    LOGIN,
    AUTH_USER,
    CLEAR_ERRORS,
    DELETE_USER,
    CHANGE_PASSWORD
} from './types';

import axios from 'axios';

//register user
export const register = (user)=> async (dispatch)=>{
    debugger;
    try{ 
        const res = await axios.post('api/users/register/', user, {headers:{'Content-type':'application/json'}} )

        dispatch({
            type: REGISTER,
            payload: res.data
        })
    }
    catch(error){
        dispatch({
            type: USER_ERROR,
            payload: error.response.data.msg
        })
    }
}

//login user
export const login = (user) => async (dispatch) =>{
    try{ 
        const res = await axios.post('api/users/login/', user, {headers:{'Content-type':'application/json'}});

        dispatch({
            type: LOGIN,
            payload: res.data
        })

       authUser();
       
    }
    catch(error){

        dispatch({
            type: USER_ERROR,
            payload: error.response.data.msg
        })
    }
}

//get logged in user
export const authUser = () => async (dispatch) => {
    
    const config={
        headers:{
            'x-auth-token': localStorage.getItem('token')
        }
    }
    try {
        const res = await axios.get(`api/users/auth`, config)

        dispatch({
            type: AUTH_USER,
            payload: res.data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR,
            payload: error.response.data.msg
        })
    }
}

//load all users
export const loadUsers = () => async (dispatch) => {
    try{ 
        const res = await axios.get('api/users/all')
        dispatch({
            type: LOAD_USERS,
            payload: res.data
        })
    }
    catch(error){
        dispatch({
            type: USER_ERROR,
            payload: error.response.data.msg
        })
    }
}

export const deleteUser = (id) => async (dispatch) =>{
    const config={
        headers:{
            'x-auth-token': localStorage.getItem('token')
        }
    }
    try{
        await axios.delete(`api/users/${id}`, config)
        dispatch({
            type: DELETE_USER,
            payload: id
        })
    }
    catch(error){
        dispatch({
            type: USER_ERROR,
            payload: error.response.data.msg
        })
    }
}

export const changePassword = (pin) => async (dispatch)=>{
    const config={
        headers:{
            'Content-type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    }
    try{
        const res = await axios.put(`api/users/`, pin, config)
        dispatch({
            type: CHANGE_PASSWORD,
            payload: res.data.msg
        })
    }
    catch(error){
        dispatch({
            type: USER_ERROR,
            payload: error.response.data.msg
        })
    }
}

//logout user
export const logout=()=> {
    return {
        type: LOGOUT
    }
}

export const clearErrors= ()=> {
    return {
        type: CLEAR_ERRORS
    }
}