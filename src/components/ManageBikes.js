import React, { Component } from 'react';
import '../styles/ManageBikes.css';

export default class ManageBikes extends Component {

  state={
    editingBikeId: -1, // -1 no bike editing, 0 adding a bike
    bikes: []
  }

  componentDidMount(){
    fetch('http://narek-dev.com/bike-rentals-api/api/getBikes')
      .then(res => res.json())
      .then(json => this.setState({bikes: json}));
  }

  editBike(id){
    console.log(id);
  }

  deleteBike(id){
    this.setState(s=>{
      let idx = s.bikes.findIndex(b=>b.id===id);
      s.bikes.splice(idx, 1);
      return s;
    });
    fetch(`http://narek-dev.com/bike-rentals-api/api/deleteBike?id=${id}`)
      .then(res => res.json())
      .then(json => console.log(json));
  }

  render() {
    let tableHeaderCells, tableRows = [];
    if(this.state.bikes.length !== 0){
      tableHeaderCells = Object.keys(this.state.bikes[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      tableHeaderCells.push(<div key="-1" className="b-table__header-cell">Actions</div>);
      tableRows = this.state.bikes.map(b=>{
        let cells = Object.values(b).map((v,i)=><div key={i} className="b-table__cell">{v}</div>);
        cells.push(
          <div key="-1" className="b-table__cell">
            <a className="b-link" onClick={()=>this.editBike(b.id)}>edit</a>
            <a className="b-link" onClick={()=>this.deleteBike(b.id)}>delete</a>
          </div>);
        return cells;
      });
    }
    return (
      <div>
        <div className="b-table">
          {tableHeaderCells}
          {tableRows}
        </div>
        <a className="b-link">add bike</a>
      </div>
    )
  }
}
