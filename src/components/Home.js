import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ManagerRoot from './ManagerRoot';

class Home extends Component {

  state = {
    auth: {
      isAuth: false,
      role: '', // 'user' or 'manager'
      userName: ''
    }
  }

  render() {
    return (
      <Router>
        <div>

          { this.state.auth.isAuth && 
            <Route exact path="/(/|login)/" render={()=>(<Redirect to={'/'+this.state.auth.role} />)}></Route> }

          { !this.state.auth.isAuth && 
            <div>
              <h1 style={{textAlign: 'center'}}>Welcome to Bike Rentals</h1>
              <div>
                <NavLink className='b-link' to='/login'>Login</NavLink>
                <NavLink className='b-link' to='/register'>Register</NavLink>
              </div>
              <div>
                <Route path='/login' render={()=>(
                  <button onClick={()=>{
                    this.setState({auth: {isAuth: true, role: 'manager', userName: 'user22'}});
                  }}>login</button>)}></Route>
                <Route path='/register' component={Register}></Route>
              </div>
            </div> }

          { this.state.auth.isAuth && 
            <div>
              <div className="b-login">
                Logged in as: {this.state.auth.userName}
                <button onClick={()=>this.setState({auth: {isAuth: false}})}>Log Out</button>
              </div>
            </div> }

          <Route path='/manager' component={ManagerRoot} />

        </div>
      </Router>
    );
  }
}

export default Home;
