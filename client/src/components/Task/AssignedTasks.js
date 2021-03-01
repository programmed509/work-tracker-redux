import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { assignedTasks } from '../../redux/actions/taskActions';
import TaskItem from './TaskItem';
import Preloader from '../Layout/Preloader';
import PropTypes from 'prop-types';

const AssignedTasks=({ tasks: { assignTasks, filteredAssign, loading }, assignedTasks })=>{

useEffect(()=>{
    assignedTasks();
    //eslint-disable-next-line
},[]);

const onSort=(e)=>{
  if(e.target.id==='assignDate'){
    assignedTasks('date');
  }
  if(e.target.id==='assignPriority'){
    assignedTasks('priority');
  }
}

if( assignTasks === null || loading ){
  return <Preloader/>
}


return(
      <>
      <div className="container">
        <h5>Assigned to you:</h5> 
        <form>
        Sort by: <label>&nbsp;&nbsp;
        <input className='blue' name="sort"  id="assignDate" value="date" type="radio" onChange={onSort}/>
        <span>Latest</span>
        </label>&nbsp;&nbsp;
        <label>
        <input className='blue' name="sort" id="assignPriority" value="priority" type="radio" onChange={onSort}/>
        <span>Priority</span>
        </label>
        </form>
        {filteredAssign && filteredAssign!==null ? 
          filteredAssign.map(task=>{
            return(
            <TaskItem key={task._id} task={task} name={task.submitter.name} deleteBool={false}/>
                  )    
            }) : 
        
            assignTasks && assignTasks.length !== 0 ?
          assignTasks.map(task=>{
            return(
            <TaskItem key={task._id} task={task} name={task.submitter.name} deleteBool={false}/>
                  )    
          }) :

        <p>No assigned task</p>
        }
      </div>
      </>
    )
}

AssignedTasks.propTypes = {
  tasks: PropTypes.object.isRequired,
  assignedTasks: PropTypes.func.isRequired,
}

const mapStateToProps=(state)=> ({
  tasks: state.tasks
})

export default connect(mapStateToProps, { assignedTasks })(AssignedTasks)