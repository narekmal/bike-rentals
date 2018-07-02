import React, { Component } from 'react';
import Selectable from '../lab/Selectable';
import './ManagerRoot.css';

class ManagerRoot extends Component {
  render() {
    return (
      <div>
        <div>this shows login info</div>
        <div className="b-menu">
          <a className="b-menu__item">Manage Bikes</a>
          <a className="b-menu__item">Manage Users</a>
          <a className="b-menu__item">Explore Reservations</a>
        </div>
        <Selectable data={[{first: "test1", second: "test3"}, {first: "test3"}]}></Selectable>
      </div>
    );
  }
}

export default ManagerRoot;
