import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import ManageBikes from './ManageBikes';
import ManageUsers from './ManageUsers';
import '../styles/ManagerRoot.css';

class ManagerRoot extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="b-login">Logged in as: test</div>
          <div className="b-menu">
            <NavLink className="b-menu__item" to='/manage-bikes'>Manage Bikes</NavLink>
            <NavLink className="b-menu__item" to='/manage-users'>Manage Users</NavLink>
            <NavLink className="b-menu__item" to='/explore-reservations'>Explore Reservations</NavLink>
          </div>
          <div>
            <Route path='/manage-bikes' component={ManageBikes}></Route>
            <Route path='/manage-users' component={ManageUsers}></Route>
          </div>
        </div>
      </Router>
      
    );
  }
}

export default ManagerRoot;
