import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import BikesList from './BikesList';
import BikesMap from './BikesMap';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getBikes} from '../../actions/bikeActions';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = dispatch => {
  return {
    getBikes: () => { dispatch(getBikes()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class UserRoot extends Component {

  render() {
    const { match } = this.props;
    return (
      <div>
        <div className="b-filters">
          Filters
        </div>
        <div>
          <BikesList></BikesList>
          <BikesMap></BikesMap>
        </div>
      </div>
    );
  }

  componentDidMount(){
    if(this.props.bikes === null)
      this.props.getBikes();
  }

}));




