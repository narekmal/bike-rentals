import React, { Component } from 'react';
import config from '../../Config';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getBikes} from '../../actions/bikeActions';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class SingleBike extends Component {

  render() {

    

    return (
      
    )
  }

}));

