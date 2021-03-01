import React from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../../redux/actions/userActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

const UserItem = ({ user: { _id, name, username }, deleteUser }) => {

  const onDelete = () => {
      if (window.confirm(`All the tasks assigned to or by ${name} will also be deleted!!`)){
        deleteUser(_id);
          M.toast({ html: `${name} data has been deleted` });
        }
    };

  return (
    <li className='collection-item'>
      <div>
      Name: <strong>{name}</strong>  , Username: <strong>{username}</strong> 
        <a href='#!' className='secondary-content' onClick={onDelete}>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

export default  connect(null, { deleteUser })(UserItem);