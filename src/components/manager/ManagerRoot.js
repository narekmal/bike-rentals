import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import ManageBikes from './ManageBikes';
import ManageUsers from './ManageUsers';

class ManagerRoot extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <div className="b-menu">
          <NavLink className="b-menu__item" to={`${match.url}/manage-bikes`}>Manage Bikes</NavLink>
          <NavLink className="b-menu__item" to={`${match.url}/manage-users`}>Manage Users</NavLink>
        </div>
        <div>
          <Route path={`${match.url}/manage-bikes`} component={ManageBikes}></Route>
          <Route path={`${match.url}/manage-users`} component={ManageUsers}></Route>
        </div>
      </div>
    );
  }
}

export default ManagerRoot;
