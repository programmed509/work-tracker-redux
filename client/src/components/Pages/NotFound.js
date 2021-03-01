import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{position: 'absolute', top: '20%', left: '0', right: '0', margin:'auto', textAlign:'center'}}>
    <h1>404 - Not Found!</h1>
    <Link to="/Login">
      Go back to Login
    </Link>
  </div>
);

export default NotFound;