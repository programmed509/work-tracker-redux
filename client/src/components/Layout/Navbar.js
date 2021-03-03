import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { search, clearSearch } from '../../redux/actions/taskActions';
import PropTypes from 'prop-types';

const Navbar = ({ users: { isAuthenticated }, search, clearSearch }) => {
    
    const [text, setText] = useState('')
    
    const onSearch=(e)=>{
        setText(e.target.value)
        search(text);
    }

    const clearSearchBar=(e)=>{
        clearSearch();
        setText('');
    }

    const guestLinks=()=>{
        return(
            <ul className='right'>
                <li>
                <Link to='/About'>About</Link>
                </li>
                <li>
                <Link to='/Login'>Login</Link>
                </li>
            </ul>
        )
    }

    const authLinks=()=>{
        return(
            <form>
                <div className="input-field">
                    <input type="search" name='search' value={text} onChange={onSearch} placeholder="Search tasks based on title, description, status, priority, users..."/>
                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                    <i className="material-icons" onClick={clearSearchBar}>close</i>
                </div>
            </form>
        )
    }
    return (
        <nav className='grey darken-3'>
        <div className='nav-wrapper'>
        <a href = "/About" className='brand-logo center'>Work Tracker</a>
            { isAuthenticated ? 
            authLinks() :     
            guestLinks()
            }   
        </div>
        </nav>
    )
}

Navbar.propTypes = {
    users: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    users: state.users
})

export default connect(mapStateToProps, { search, clearSearch })(Navbar);
