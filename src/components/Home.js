import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login, logout} from '../actions/authActions';
import {BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthPane from './auth/AuthPane';
import PrivateRoute from './auth/PrivateRoute';
import ManagerRoot from './manager/ManagerRoot';
import UserRoot from './user/UserRoot';


class Home extends Component {

  render() {
    return (
      <Router>
        <div className="l-root">

          { this.props.auth.isAuth && 
            <Route exact path="/(/|login)/" render={()=>(<Redirect to={'/'+this.props.auth.role} />)}></Route> }

          { !this.props.auth.isAuth && 
            <div className="b-home">
              <div className="b-home__title" style={{textAlign: 'center'}}>Welcome to Bike Rentals</div>
              <div className="b-home__links">
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/register'>Register</NavLink>
              </div>
              <div className="b-home__auth">
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
              </div>
            </div> }

          { this.props.auth.isAuth && <AuthPane /> }

          <PrivateRoute path='/manager' role='manager' component={ManagerRoot} />
          <PrivateRoute path='/user' role='user' component={UserRoot} />

        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ ...state }); 

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) => { dispatch(login(userName, password)) },
    logout: () => { dispatch(logout()) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
