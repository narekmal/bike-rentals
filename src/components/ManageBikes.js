import React, { Component } from 'react'

export default class ManageBikes extends Component {

  state={
    bikes: []
  }

  componentDidMount(){
    fetch('http://narek-dev.com/bike-rentals-api/api/getBikes')
    .then(res => res.json())
    .then(json => this.setState({bikes: json}));
    console.log('managebikes did mount');
  }

  render() {
    let tableHeaderCells, tableRows = [];
    if(this.state.bikes.length !== 0){
      tableHeaderCells = Object.keys(this.state.bikes[0]).map(k=><td>{k}</td>);
      tableRows = this.state.bikes.map(b=>{
        let cells = Object.values(b).map(v=><td>{v}</td>);
        return (<tr>{cells}</tr>)
      });
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              {tableHeaderCells}
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    )
  }
}
