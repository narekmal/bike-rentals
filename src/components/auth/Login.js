import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';

class Login extends Component {
  render() {
    return (
      <div>
        <button onClick={()=>this.props.login('fake manager', 'fake pw')}>Log In as Manager</button>
        <button onClick={()=>this.props.login('fake user', 'fake pw')}>Log In as User</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state }); 

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) => { dispatch(login(userName, password)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);