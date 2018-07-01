import React, { Component } from 'react';
import Selectable from '../lab/Selectable';

class ManagerRoot extends Component {
  render() {
    return (
      <div>
        <div>this shows login info</div>
        <div>
          this is the menu
          <a href="">Manage Bikes</a>
          <a href="">Manage Users</a>
          <a href="">Explore Reservations</a>
        </div>
        <Selectable data={[{first: "test1", second: "test3"}, {first: "test3"}]}></Selectable>
      </div>
    );
  }
}

export default ManagerRoot;
