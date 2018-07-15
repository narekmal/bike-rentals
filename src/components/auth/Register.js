import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login, fakeLogin} from '../../actions/authActions';
import config from '../../Config.js';

class Register extends Component {

  state = {
    userName: '',
    password: '',
    role: 'user',

    status: ''
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 70}}>
        <div>

          <form className="b-auth-form" action="" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="User Name" value={this.state.userName} onChange={e=>this.setState({userName: e.target.value})} />
            <input type="password" placeholder="Password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} />

            <div className="b-auth-form__role-block">
              <input onClick={()=>this.setState({role: 'user'})} id="user-radio" type="radio" name="role" value="user" defaultChecked />
              <label htmlFor="user-radio">User</label>
              <input onClick={()=>this.setState({role: 'manager'})} className="b-auth-form__manager-radio"  id="manager-radio" type="radio" name="role" value="manager" />
              <label htmlFor="manager-radio">Manager</label>
            </div>

            <input type="submit" value="Register"/>

            <div className="b-auth-form__status">
              {this.state.status}
            </div>
          </form>

        </div>
      </div>
    )
  }

  handleSubmit(e){
    e.preventDefault();

    this.setState({status: 'processing...'})
    
    let formData = new FormData();
    formData.append("userName", this.state.userName);
    formData.append("password", this.state.password);
    formData.append("role", this.state.role);

    fetch(`${config.apiBaseUrl}/api/register`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {

        console.log(json)
        let message = json.status ? 'user added' : 'failed to add user';
        this.setState({status: message})

      })
      .catch(err => err.text().then(errorMessage => console.log(errorMessage)));

  }
}

const mapStateToProps = state => ({ ...state }); 

const mapDispatchToProps = dispatch => {
  return {
    fakeLogin: (userName, password) => { dispatch(fakeLogin(userName, password)) },
    login: (userName, password) => { dispatch(login(userName, password)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);