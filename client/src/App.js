import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import Home from './components/Pages/DashBoard';
import About from './components/Pages/About';
import NotFound from './components/Pages/NotFound';
import Login from './components/User/Login';
import AdminModal from './components/User/AdminModal';
import AddUserModal from './components/User/AddUserModal';
import SecureRoute from './components/Pages/SecureRoute';
import Api from './components/Pages/Api';
import './App.css';
import Navbar from './components/Layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChangePinModal from './components/User/ChangePinModal';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  
  useEffect(()=>{
    M.AutoInit();
  },[])

  return (
    <>
    <Provider store={store}>
    <Router>
      <Navbar/>
      <AdminModal/>
      <AddUserModal/>
      <ChangePinModal/>
      <Switch>
        <SecureRoute exact path='/' component = {Home}/>
        <Route exact path='/About' component = {About}/>
        <Route exact path='/Login' component = {Login}/>
        <Route exact path='/Api' component = {Api}/>
        <Route component={NotFound}/>
      </Switch> 
    </Router>
    </Provider>
    </>
  );
}

export default App;
