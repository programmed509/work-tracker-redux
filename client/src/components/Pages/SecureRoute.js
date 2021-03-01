import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { authUser } from '../../redux/actions/userActions';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

const SecureRoute = ({ users: { isAuthenticated, loading }, authUser, component: Component, ...rest}) => {
    
    useEffect(()=>{
        authUser();
    },[])

    return (
        <Route {...rest} render={ props =>
        isAuthenticated && !loading  ? <Component {...props} /> : <Redirect to ='/Login'/>
        }/>
    )
}

SecureRoute.propTypes = {
    users: PropTypes.object.isRequired,
    authUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    users: state.users
})

export default connect(mapStateToProps, { authUser })(SecureRoute);