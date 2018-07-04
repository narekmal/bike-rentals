import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './ManagerRoot.css';

class ManagerRoot extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>this shows login info</div>
          <div className="b-menu">
            <NavLink className="b-menu__item" to='/manage-bikes'>Manage Bikes</NavLink>
            <NavLink className="b-menu__item" to='/manage-users'>Manage Users</NavLink>
            <NavLink className="b-menu__item" to='/explore-reservations'>Explore Reservations</NavLink>
          </div>
          <div>
            <Route path='/manage-bikes' render={()=>(<h1>manage bikes</h1>)}></Route>
          </div>
        </div>
      </Router>
      
    );
  }
}

export default ManagerRoot;
