import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import BikesList from './BikesList';
import BikesMap from './BikesMap';

class UserRoot extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <div className="b-menu">
          <NavLink className="b-menu__item" to={`${match.url}/bikes-list`}>Bikes List</NavLink>
          <NavLink className="b-menu__item" to={`${match.url}/map`}>Map</NavLink>
        </div>
        <div>
          <Route path={`${match.url}/bikes-list`} component={BikesList}></Route>
          <Route path={`${match.url}/map`} component={BikesMap}></Route>
        </div>
      </div>
    );
  }
}

export default UserRoot;