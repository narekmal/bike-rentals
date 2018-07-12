import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login, logout} from '../../actions/authActions';

class AuthPane extends Component {
  render() {
    return (
      <div className="b-login">
        Logged in as: <span className="b-login__name">{this.props.auth.userName}</span>
        <button className="b-login__btn" onClick={()=>this.props.logout()}>Log Out</button>
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
)(AuthPane);
