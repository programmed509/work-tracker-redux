import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import { submittedTasks } from '../../redux/actions/taskActions';
import Preloader from '../Layout/Preloader';
import PropTypes from 'prop-types';
import '../../App.css';

const SubmittedTasks=({ tasks: { submitTasks, filteredSubmit, loading }, submittedTasks })=>{

useEffect(()=>{ 

    submittedTasks();
  
      //eslint-disable-next-line
},[]);

const onSort=(e)=>{
  if(e.target.id === 'submitDate'){
    submittedTasks('date');  
  }
  else if(e.target.id === 'submitPriority'){
    submittedTasks('priority');
  }
}

if( submitTasks === null || loading ){
  return <Preloader/>
}


return(
      <>
      <div className="mycontainer">
        <h5>Submitted by you:</h5>
        <form>
        Sort by: <label>&nbsp;&nbsp;
        <input className='blue' name="sort"  id="submitDate" type="radio" onClick={onSort}/>
        <span>Latest</span>
        </label>&nbsp;&nbsp;
        <label>
        <input className='blue' name="sort" id="submitPriority" type="radio" onClick={onSort}/>
        <span>Priority</span>
        </label>
        </form>
        {filteredSubmit && filteredSubmit !== null ?
         
          filteredSubmit.map(task=>{
            return(
            <TaskItem key={task._id} task={task} name={task.assigned.name} deleteBool={true}/>
                  )    
          }) :
        
        submitTasks && submitTasks.length !== 0 ?
          submitTasks.map(task=>{
          return(
          <TaskItem key={task._id} task={task} name={task.assigned.name} deleteBool={true}/>
                )    
          }) :
        
        <p>No submitted task</p>

        }
        </div>
      </>
    )
}

SubmittedTasks.propTypes = {
  tasks: PropTypes.object.isRequired,
  submittedTasks: PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
  tasks: state.tasks
})

export default connect(mapStateToProps, { submittedTasks })(SubmittedTasks)