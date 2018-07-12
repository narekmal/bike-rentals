import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';

class Login extends Component {
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
        <button onClick={()=>this.props.login('fake manager', 'fake pw')}>Log in as Manager</button>
        <button style={{marginLeft: 20}} onClick={()=>this.props.login('fake user', 'fake pw')}>Log in as User</button>
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