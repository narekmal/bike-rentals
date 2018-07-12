import React, { Component } from 'react';

export default class BikesList extends Component {

  state = {
    items: []
  }

  render() {

    let tableHeaderCells, tableRowCells, tableColumnCount;
    if(this.state.items.length !== 0){
      tableHeaderCells = Object.keys(this.state.items[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      tableHeaderCells.push(<div key="-1" className="b-table__header-cell">Actions</div>);
      tableColumnCount = tableHeaderCells.length;

      tableRowCells = this.state.items.map(b=>{
        if(b.id === this.state.editingItemId)
          return this.getEditRow();
        let cells = Object.values(b).map((v,i)=><div key={i} className="b-table__cell">{v}</div>);
        cells.push(
          <div key="-1" className="b-table__cell">
            <a className="u-link" onClick={()=>{}}>view</a>
          </div>);
        return cells;
      });
    }

    return (
      <div className="l-pane">
        <div className="b-table" style={{gridTemplateColumns: `repeat(${tableColumnCount}, 1fr)`}}>
          {tableHeaderCells}
          {tableRowCells}
        </div>
      </div>
    )
  }

  componentDidMount(){
    fetch('http://narek-dev.com/bike-rentals-api/api/getBikes')
      .then(res => res.json())
      .then(json => this.setState({items: json}));
  }
 

 
 

}
