import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { clearTasks } from '../../redux/actions/taskActions';
import PropTypes from 'prop-types'

const MenuButton = ({ users:{ isAdmin }, logout, clearTasks }) => {
    useEffect(()=>{
        let elem1 = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elem1, {
          direction: 'left',
          hoverEnabled: false,
        });

        let elem2 = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elem2, {
          margin: 9
        }); 
      },[])

    const history = useHistory();
    
    const onLogout=()=>{
        logout();
        clearTasks();
        history.push('/Login');
        window.location.reload(); 
    }

    return (
      <>
        <div className="fixed-action-btn">
        <a className="btn-floating btn-large grey darken-3 click-to-toggle tooltipped" data-position='top' data-tooltip='Click for options'>
          <i className="large material-icons">menu</i>
        </a>
        <ul>
          { isAdmin && 
            <li>
              <a href='#admin-modal' className="btn btn-floating blue modal-trigger tooltipped" data-position='top' data-tooltip='Admin Functions' >
                <i className="material-icons">admin_panel_settings</i>
              </a>
            </li>
          }
          <li>
            <a href='#change-pin-modal' className="btn-floating blue modal-trigger tooltipped" data-position='top' data-tooltip='Change PIN'> 
              <i className="material-icons">lock</i>
            </a>
          </li>
          <li>
            <a className="btn-floating blue tooltipped" onClick={onLogout} data-position='top' data-tooltip='Log Out'>
              <i className="material-icons">logout</i>
            </a>
          </li>
        </ul>
      </div>
      </>
    )
}

MenuButton.propTypes = {
  users: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  clearTasks: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, { logout, clearTasks })(MenuButton)
