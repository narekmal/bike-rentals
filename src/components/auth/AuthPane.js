import React, { Component } from 'react'

export default class AuthPane extends Component {
  render() {
    return (
      <div>
              <div className="b-login">
                Logged in as: {this.props.auth.userName}
                <button onClick={()=>{
                  console.log('hh');

                }}>Log Out</button>
              </div>
            </div>
    )
  }
}
