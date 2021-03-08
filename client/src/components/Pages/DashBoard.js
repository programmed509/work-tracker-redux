import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import AssignedTasks from '../Task/AssignedTasks';
import SubmittedTasks from '../Task/SubmittedTasks';
import TaskForm from '../Task/TaskForm';
import { authUser } from '../../redux/actions/userActions';
import MenuButton from '../Layout/MenuButton';
import PropTypes from 'prop-types';

const DashBoard = ({ users: { user }, authUser}) => {
    useEffect(() => {
        authUser();
    },[])

    return(
        <>
        <div className="mycontainer">
            <div className="row">
                <div className="col m4">
                    <SubmittedTasks/>
                </div>
                <div className="col m4">
                    <AssignedTasks/> 
                </div>
                <div className="col m4 sticky">
                    <TaskForm/> 
                </div>
                { user && <MenuButton/>}
            </div>
            </div>
        </>
    )
}

DashBoard.propTypes = {
    users: PropTypes.object.isRequired,
    authUser: PropTypes.func.isRequired,
};

const mapStateToProps = ( state ) =>({
    users: state.users
})

export default connect(mapStateToProps, { authUser })(DashBoard);
