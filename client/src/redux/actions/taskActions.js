import {
    TASK_ERROR,
    SUBMITTED_TASKS,
    ASSIGNED_TASKS,
    CLEAR_TASKS,
    ADD_TASK,
    DELETE_TASK,
    SET_LOADING,
    UPDATE_TASK,
    SEARCH_TASKS,
    CLEAR_SEARCH,
    CLEAR_MESSAGE,
    } from './types';

import axios from 'axios';

//addTask
export const addTask = (task) => async (dispatch)=>{
    const config = {
        headers:{
            'Content-type':'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    }

    try {
        const res = await axios.post('api/tasks/', task, config)

        dispatch({
            type: ADD_TASK,
            payload: res.data 
        })
    }
    
    catch (error) {
        console.log(error)

        dispatch({
            type: TASK_ERROR,
            payload: error.response.data.msg
        })
    }        
}

//loadTasks
export const submittedTasks = (sort) => async (dispatch) =>{
    setLoading();
    const config = {
        headers:{
            'x-auth-token': localStorage.getItem('token')
        }
    }
    try {
        const res = await axios.get(`api/tasks/submitted/${sort}`, config)
        
        dispatch({
            type: SUBMITTED_TASKS,
            payload: res.data 
        })
    }
    catch (error) {
        console.log(error)

        dispatch({
            type: TASK_ERROR,
            payload: error.response.data
        })
    }  
}

export const assignedTasks = (sort) => async (dispatch) =>{
    setLoading();
    const config = {
        headers:{
            'x-auth-token': localStorage.getItem('token')
        }
    }
    try {
        const res = await axios.get(`api/tasks/assigned/${sort}`, config)
        
        dispatch({
            type: ASSIGNED_TASKS,
            payload: res.data 
        })
    }
    catch (error) {
        console.log(error)

        dispatch({
            type: TASK_ERROR,
            payload: error.response.data.msg
        })
    }  
}

//deleteTask
export const deleteTask= (id) => async (dispatch)=>{
    const config = {
        headers:{
            'Content-type':'application/json',
            'x-auth-token':localStorage.getItem('token'),
        }
    }

    try {
        await axios.delete(`api/tasks/${id}`,config)

        dispatch({
            type: DELETE_TASK,
            payload: id 
        })
    }
    catch (error) {
        console.log(error)

        dispatch({
            type: TASK_ERROR,
            payload: error.response.data.msg
        })
    }  
}

//changeStatus
export const updateTask = (task) => async (dispatch) => {  
    setLoading();
    const config = {
        headers:{
            'Content-type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }

    try {
        const res = await axios.put(`api/tasks/${task.id}`, task, config)

        dispatch({
            type: UPDATE_TASK,
            payload: res.data 
        })
    }
    catch (error) {
        console.log(error)

        dispatch({
            type: TASK_ERROR,
            payload: error.response.data.msg
        })
    }  
}

export const setLoading=()=>{
    return{
        type: SET_LOADING
    }
}

//search tasks
export const search =(text)=>{
    return {
        type: SEARCH_TASKS,
        payload: text
    }
}

export const clearSearch = () => {
    return {
        type: CLEAR_SEARCH
    }
}

//clear tasks
export const clearTasks = () => {
    return {
        type: CLEAR_TASKS
    }
}

export const clearMessage = (id) => async (dispatch) =>{   
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }
    try 
    {
        const res = await axios.post(`api/tasks/msg/${id}`)

        dispatch({
            type: CLEAR_MESSAGE,
            payload: res.data
        })
    }
    catch (error) {
        console.log(error)

        dispatch({
            type: TASK_ERROR,
            payload: error.response.data.msg
        })
    }
}