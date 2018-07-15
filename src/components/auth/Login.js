import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login, fakeLogin} from '../../actions/authActions';
import config from '../../Config.js';

class Login extends Component {

  state = {
    userName: '',
    password: '',
    users: [],

    isAuthenticating: false,
    areUsersLoading: false
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 70}}>
        <div>

          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 30, display: 'none'}}>
            <button onClick={()=>this.props.fakeLogin('fake manager', 'fake pw')}>Log in as Manager</button>
            <button style={{marginLeft: 20}} onClick={()=>this.props.fakeLogin('fake user', 'fake pw')}>Log in as User</button>
          </div>
          
          <form className="b-auth-form" action="" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="User Name" value={this.state.userName} onChange={e=>this.setState({userName: e.target.value})} />
            <input type="password" placeholder="Password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} />
            <input type="submit" value="Login"/>
            <div>
              {this.props.auth.isAuthenticating && <span>logging in...</span>}
              {this.props.auth.isAuthenticating === false && !this.props.auth.isAuth && <span>failed to log in</span>}
            </div>
          </form>

        </div>
      </div>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.login(this.state.userName, this.state.password);
  }
}

const mapStateToProps = state => ({ ...state }); 

const mapDispatchToProps = dispatch => {
  return {
    fakeLogin: (userName, password) => { dispatch(fakeLogin(userName, password)) },
    login: (userName, password) => { dispatch(login(userName, password)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);