import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/userActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

const AddUserModal = ({ register }) => {

    const [ user , setUser ] = useState({
        name:'',
        username:'',
        pin:''
    })

    const changeHandler=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    const submitHandler=async (e)=>{
        e.preventDefault();
        if( name === '' || username === '' || pin === ''){
            M.toast({html: `Please enter all details`})
        }
        else{
            register(user);
            M.toast({html: `${name} has been registered`})
            setUser({
                name:'',
                username:'',
                pin:''
            })
        }       
    }

    const { name, username, pin } = user;

    return (
        <div id='add-user-modal' className='modal bottom-sheet' style={{width:'35%', height:'50%'}}>
        
        <form style={{padding: '20px'}} onSubmit={submitHandler}>
        <h5>Register the new user <span><a href='#!' className='material-icons right red-text modal-close'>close</a></span></h5>
        <div className="input-field">
            <input type="text" id="name" name="name" value={name} onChange={changeHandler} />
            <label htmlFor="name">Name</label>
        </div>
        
        <div className="input-field">
            <input type="text" id="username" name="username" value={username} onChange={changeHandler}/>
            <label htmlFor="username">Username</label>
        </div>
        
        <div className="input-field">
            <input type="password" id="pin" name="pin" value={pin} pattern="[0-9]{4}" onChange={changeHandler}/>
            <label htmlFor="pin">PIN</label>
        </div>

        <input type="submit" className='btn blue' value='Register'/>

        </form> 
        </div>
    )
}

AddUserModal.propTypes = {
    register: PropTypes.func.isRequired,
}

export default connect(null, { register })(AddUserModal);