import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ManagerRoot from './ManagerRoot';
import AuthPane from './AuthPane';
import {connect} from 'react-redux';
import {login, logout} from '../actions/authActions';

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

          <Route path='/manager' component={ManagerRoot} />

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
