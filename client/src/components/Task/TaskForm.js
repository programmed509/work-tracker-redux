import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../../redux/actions/taskActions';
import { loadUsers } from '../../redux/actions/userActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import '../../App.css'

const TaskForm = ({ users: { users, user }, addTask, loadUsers }) => {
    useEffect(()=>{
        loadUsers();
    },[])

    const [newUser, setUser] = useState([])
    
    const [ tasks , setTask ] = useState({
        task:'',
        description:'',
        priority:'Normal',
        status:'Open',
        type:'',
        assigned:'',
        message: 'New Task!'
    }); 

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(tasks.task===''){
            M.toast({html:'Please provide task name'})
        }else if(tasks.assigned===''){
            M.toast({html:'Please assign the task'})
        } else{
            addTask(tasks)
            M.toast({html:`Task has been assigned to ${newUser[0].name}`})
        
        setTask({task:'',
        description:'',
        priority:'Normal',
        status:'Open',
        type:'',
        assigned:'',
    });
    }
    }

    const handleChange=(e)=>{
        if(e.target.name === 'assigned'){
            setUser(users.filter(user=> user._id === e.target.value))
            setTask({...tasks, assigned: users})
        }
        setTask({...tasks,[e.target.name]:e.target.value})
    }

    const { task, description, assigned  } = tasks;

    return (
        <div className='mycontainer'>
        <h5> Hi! {user && user.name} </h5>
        Assign a new task:
        <form className="myCard z-depth-1" onSubmit={handleSubmit}>
        <div className="input-field col s12" >
            <input type="text" className="validate" id="task" name='task' value={task} onChange={handleChange}/>
            <label htmlFor="task">Task title</label>
        </div>

        <div className="input-field col s12">
            <textarea className="materialize-textarea"  id="description" name='description' value={description} onChange={handleChange}/>
            <label htmlFor="description">Description</label>
        </div>
        <div className = 'row'>
            <div className = 'col s6'>
            <select className="browser-default" name='type' onChange={handleChange}>
                <option defaultValue>Issue Type</option>
                <option value="Add" >Add</option>
                <option value="Bug">Bug</option>
                <option value="Modify">Modify</option>
                <option value="Task">Task</option>
                <option value="Test">Test</option>
            </select>
            </div>
            <div className = 'col s6'>
            <select className="browser-default" name='priority' onChange={handleChange}>
                <option defaultValue>Set Priority</option>
                <option value="1">Critical</option>
                <option value="2">High</option>
                <option value="3">Normal</option>
                <option value="4">Low</option>
            </select>
            </div>
            </div><br></br>
            <div className = 'row'>
                <div className = 'col s6'>
                <select className="browser-default" name='assigned' value={assigned} onChange={handleChange}>
                <option defaultValue>Assign to</option>
                {users && users.map(user=>{
                    return <option key={user._id} value={user._id}>{user.name}</option>
                })}
            </select>
            </div>
            <div className = 'col s6'>
                <input className='btn blue' style={{width:'100%'}} type='submit' value='Add'/>
            </div>
            </div>
        </form>
        </div>
    )
}

TaskForm.propTypes = {
    users: PropTypes.object.isRequired,
    addTask: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    users: state.users
})

export default connect(mapStateToProps, {addTask, loadUsers })(TaskForm);