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
    } from '../actions/types';

const initialState = {
        assignTasks: null,
        submitTasks: null,
        error: null,
        loading: false,
        filteredSubmit: null,
        filteredAssign: null
}

export default (state=initialState, action) =>{
    switch(action.type){
        case ADD_TASK: return {
            ...state,
            submitTasks: [...state.submitTasks, action.payload],
            assignTasks: action.payload.assigned._id === action.payload.submitter._id ? [...state.assignTasks, action.payload] : state.assignTasks,
            loading: false
        }
        
        case ASSIGNED_TASKS: return{
            ...state,
            assignTasks: action.payload,
            loading: false
        }
        case SUBMITTED_TASKS: return{
            ...state,
            submitTasks: action.payload,
            loading: false
        }
        case DELETE_TASK: return{
            ...state,
            submitTasks: state.submitTasks.filter(task => task._id !== action.payload),
            assignTasks: state.assignTasks.filter(task => task._id !== action.payload),
            loading: false
        }

        case UPDATE_TASK: return{
            ...state,
            submitTasks: state.submitTasks.map(task => task._id === action.payload._id ? action.payload : task),
            assignTasks: state.assignTasks.map(task => task._id === action.payload._id ? action.payload : task),
            loading: false
        }

        case SEARCH_TASKS: return{
            ...state,
            filteredSubmit: state.submitTasks.filter( task =>{
                const regexp = new RegExp(`${action.payload}`,'gi') ;   
                return task.task.match(regexp) || task.description.match(regexp) || task.assigned.name.match(regexp) || task.status.match(regexp)
                }
            ),
            filteredAssign: state.assignTasks.filter( task =>{
                const regexp =new RegExp(`${action.payload}`, 'gi')    
                return task.task.match(regexp) || task.description.match(regexp) || task.submitter.name.match(regexp) || task.status.match(regexp)
                }
            )
        }

        case SET_LOADING: return{
            ...state,
            loading: true
        }

        case TASK_ERROR: return{
            ...state,
            error: action.payload
        }

        case CLEAR_SEARCH: return {
            ...state,
            filteredAssign: null,
            filteredSubmit: null
        }

        case CLEAR_MESSAGE: return {
            ...state,
            submitTasks : state.submitTasks.map(task => task._id === action.payload._id ? action.payload : task),
            assignTasks : state.assignTasks.map(task => task._id === action.payload._id ? action.payload : task),
            loading: false
        }

        case CLEAR_TASKS: return {
            ...state,
            assignTasks: null,
            submitTasks: null,
            error: null
        }

        default : return state
    }
}