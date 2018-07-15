import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login, fakeLogin} from '../../actions/authActions';
import config from '../../Config.js';

class Login extends Component {

  state = {
    userName: '',
    password: '',

    users: []
  }

  render() {

    let tableHeaderCells, tableRows = [];
    let tableColCount;
    if(this.state.users.length !== 0){
      tableHeaderCells = Object.keys(this.state.users[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      tableColCount = tableHeaderCells.length;
      tableRows = this.state.users.map(b=>{
        let cells = Object.values(b).map((v,i)=><div key={i} className="b-table__cell">{v}</div>);
        return cells;
      });
    }

    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 70}}>
        <div>

          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 30}}>
            <button onClick={()=>this.props.fakeLogin('manager')}>Manager</button>
            <button style={{marginLeft: 20}} onClick={()=>this.props.fakeLogin('user')}>User</button>
          </div>
          
          <form className="b-auth-form" action="" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="User Name" value={this.state.userName} onChange={e=>this.setState({userName: e.target.value})} />
            <input type="password" placeholder="Password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} />
            <input type="submit" value="Login"/>
            <div className="b-auth-form__status">
              {this.props.auth.isAuthenticating && <span>logging in...</span>}
              {this.props.auth.isAuthenticating === false && !this.props.auth.isAuth && <span>failed to log in</span>}
            </div>
          </form>

        </div>

        <div style={{marginTop: 50}}>
          { this.state.users.length == 0 && 
            <div>loading users...</div>}
          { this.state.users.length != 0 && 
            <div className="b-table" style={{gridTemplateColumns: `repeat(${tableColCount}, 1fr)`}}>
              {tableHeaderCells}
              {tableRows}
            </div>}
        </div>

      </div>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.login(this.state.userName, this.state.password);
  }

  componentDidMount(){
    fetch(`${config.apiBaseUrl}/api/getUsersForLoginPage`)
      .then(res => res.json())
      .then(json => this.setState({users: json}));
  }

}

const mapStateToProps = state => ({ ...state }); 

const mapDispatchToProps = dispatch => {
  return {
    fakeLogin: (role) => { dispatch(fakeLogin(role)) },
    login: (userName, password) => { dispatch(login(userName, password)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);