import React, { Component } from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class PrivateRoute extends Component {
  render() {
    let { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => this.props.auth.isAuth ? (<Component {...props} />) : (<Redirect to="/login" />)} />
    );
  }
}

const mapStateToProps = state => ({ ...state }); 

const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
