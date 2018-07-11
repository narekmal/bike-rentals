import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login, logout} from '../../actions/authActions';

class Login extends Component {
  render() {
    return (
      <div>
        <button onClick={()=>this.props.login('fake user name', 'fake pw')}>Log In</button>
      </div>
    )
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
)(Login);