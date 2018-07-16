import React, { Component } from 'react';
import config from '../../Config';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {applyFilters} from '../../actions/filterActions';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = dispatch => {
  return {
    applyFilters: (filters) => { dispatch(applyFilters(filters)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class Filters extends Component {

  state={
    color: '',
    model: '',
    minWeight: '',
    maxWeight: '',
    nearLoc: '',
    minRating: ''
  }

  render() {

    return (
      <div className="b-filters">
        Filters
        <form onSubmit={this.apply.bind(this)} className="b-filters__form">
          <input value={this.state.color} onChange={e=>this.setState({color: e.target.value})} type="text" placeholder="Color"/>
          <input value={this.state.model} onChange={e=>this.setState({model: e.target.value})} type="text" placeholder="Model"/>
          <input value={this.state.minWeight} onChange={e=>this.setState({minWeight: e.target.value})} type="text" placeholder="Min. Weight"/>
          <input value={this.state.maxWeight} onChange={e=>this.setState({maxWeight: e.target.value})} type="text" placeholder="Max. Weight"/>
          <input value={this.state.nearLoc} onChange={e=>this.setState({nearLoc: e.target.value})} type="text" placeholder="Near This Location"/>
          <input value={this.state.minRating} onChange={e=>this.setState({minRating: e.target.value})} type="text" placeholder="Min. Rating"/>
        </form>
        <button onClick={this.apply.bind(this)}>Apply</button>
        <button onClick={this.clear.bind(this)}>Clear</button>
      </div>
    )
  }

  componentDidMount(){
    this.setState({...this.props.filters});
  }

  apply(){
    console.log('ste');
    this.props.applyFilters({...this.state});
  }

  clear(){
    let noFilters = {
      color: '',
      model: '',
      minWeight: '',
      maxWeight: '',
      nearLoc: '',
      minRating: ''
    };
    this.setState({...noFilters});
    this.props.applyFilters({...noFilters});
  }

}));

