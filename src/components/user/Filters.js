import React, { Component } from 'react';
import config from '../../Config';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getBikes} from '../../actions/bikeActions';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class Filters extends Component {

  render() {
    //color, model, weight, location or rate averages
    

    return (
      <div className="b-filters">
        Filters
        <form className="b-filters__form">
          <input type="text" placeholder="Color"/>
          <input type="text" placeholder="Model"/>
        </form>
        <button>Apply</button>
        <button>Clear</button>
      </div>
    )
  }

}));

