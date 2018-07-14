import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
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
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
        <button onClick={()=>this.props.login('fake manager', 'fake pw')}>Log in as Manager</button>
        <button style={{marginLeft: 20}} onClick={()=>this.props.login('fake user', 'fake pw')}>Log in as User</button>
        <form action="" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="User Name" value={this.state.userName} onChange={e=>this.setState({userName: e.target.value})} />
          <input type="password" placeholder="Password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} />
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }

  handleSubmit(e){
    console.log('submit');
    e.preventDefault();

    let formData = new FormData();
    formData.append("userName", this.state.userName);
    formData.append("password", this.state.password);
    fetch(`${config.apiBaseUrl}/api/authenticate`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
      });
  }
}

const mapStateToProps = state => ({ ...state }); 

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) => { dispatch(login(userName, password)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);