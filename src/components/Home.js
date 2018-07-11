import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login, logout} from '../actions/authActions';
import {BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthPane from './auth/AuthPane';
import PrivateRoute from './auth/PrivateRoute';
import ManagerRoot from './manager/ManagerRoot';


class Home extends Component {

  render() {
    return (
      <Router>
        <div>

          { this.props.auth.isAuth && 
            <Route exact path="/(/|login)/" render={()=>(<Redirect to={'/'+this.props.auth.role} />)}></Route> }

          { !this.props.auth.isAuth && 
            <div>
              <h1 style={{textAlign: 'center'}}>Welcome to Bike Rentals</h1>
              <div>
                <NavLink className='b-link' to='/login'>Login</NavLink>
                <NavLink className='b-link' to='/register'>Register</NavLink>
              </div>
              <div>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
              </div>
            </div> }

          { this.props.auth.isAuth && <AuthPane /> }

          <PrivateRoute path='/manager' component={ManagerRoot} />

        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) => {
      dispatch(login(userName, password));
    },
    logout: () => {
      dispatch(logout());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
