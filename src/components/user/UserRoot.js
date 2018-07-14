import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import BikesList from './BikesList';
import BikesMap from './BikesMap';
import SingleBike from './SingleBike';
import Filters from './Filters';

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
        <Route exact path={`${match.url}`} render={()=>(
          <div>
            <Filters />
            <BikesList />
            <BikesMap />
          </div>
        )} />

        <Route path={`${match.url}/bike/:id`} component={SingleBike}></Route>
      </div>
    );
  }

  componentDidMount(){
    if(this.props.bikes === null)
      this.props.getBikes();
  }

}));




