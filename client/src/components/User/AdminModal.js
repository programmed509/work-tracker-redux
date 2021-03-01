import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/actions/userActions';
import UserItem from './UserItem';
import PropTypes from 'prop-types';

const AdminModal = ({ users: { users, isAdmin }, loadUsers}) => {
    
  useEffect(()=>{
      if(isAdmin){
        loadUsers();
      }
        //eslint-disable-next-line
    },[])
    
    
  return (
        <div id='admin-modal' className='modal bottom-sheet' style={{width:'50%', height:'50%'}}>
      <div className='modal-content'>
        <h4>Users List  <span><a href='#add-user-modal' className='btn-floating blue modal-trigger'>
            <i className='material-icons'>add</i>
          </a></span><span><a href='#!' className='material-icons right red-text modal-close'>close</a></span></h4>
        <ul className='collection'>
          { users && isAdmin &&
            users.map(user => <UserItem  key={user._id} user={user} />)}
        </ul>
      </div>
    </div>
        )
}

AdminModal.propTypes = {
  users: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, { loadUsers })(AdminModal);
