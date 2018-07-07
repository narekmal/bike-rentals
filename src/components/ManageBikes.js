import React, { Component } from 'react';
import '../styles/ManageBikes.css';

export default class ManageBikes extends Component {

  state = {
    editingBikeId: -1, // -1 no bike editing, 0 adding a bike
    tempBike: {...this.emptyBike},
    bikes: []
  }

  emptyBike = {id: 0, model: '', photo: '', color: '', weight: '', location: '', available: 1, rate: 0}

  render() {
    let tableHeaderCells, tableRows = [];
    if(this.state.bikes.length !== 0){
      tableHeaderCells = Object.keys(this.state.bikes[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      tableHeaderCells.push(<div key="-1" className="b-table__header-cell">Actions</div>);
      tableRows = this.state.bikes.map(b=>{
        if(b.id === this.state.editingBikeId)
          return this.getEditRow(b.id);
        let cells = Object.values(b).map((v,i)=><div key={i} className="b-table__cell">{v}</div>);
        cells.push(
          <div key="-1" className="b-table__cell">
            <a className="b-link" onClick={()=>this.editBike(b.id)}>edit</a>
            <a className="b-link" onClick={()=>this.submitDeleteBike(b.id)}>delete</a>
          </div>);
        return cells;
      });
      if(this.state.editingBikeId === 0) // adding item
        tableRows.push(this.getEditRow(0));
    }
    return (
      <div>
        <form onSubmit={e=>{console.log('herr'); e.preventDefault();}}>
          <div className="b-table">
            {tableHeaderCells}
            {tableRows}
          </div>
        </form>
        <a className="b-link" onClick={()=>this.addBike()}>add bike</a>
        {/* <form onSubmit={e=>{console.log('herr'); e.preventDefault();}}>
        <input type="text"/>
        <input type="submit"/>
        </form> */}
      </div>
    )
  }

  getEditRow(bikeId) {
    let cells = [], i = 0;
    cells.push(<div key={i++} className="b-table__cell">{bikeId ? bikeId : ''}</div>);
    cells.push(<div key={i++} className="b-table__cell"><input type="text" value={this.state.tempBike.model} onChange={e=>{e.persist(); this.setState(s=>({tempBike:{...s.tempBike, model: e.target.value}}))}}/></div>);
    cells.push(<div key={i++} className="b-table__cell"></div>);
    cells.push(<div key={i++} className="b-table__cell"><input type="text" value={this.state.tempBike.color} onChange={e=>{e.persist(); this.setState(s=>({tempBike:{...s.tempBike, color: e.target.value}}))}}/></div>);
    cells.push(<div key={i++} className="b-table__cell"><input type="text" value={this.state.tempBike.weight} onChange={e=>{e.persist(); this.setState(s=>({tempBike:{...s.tempBike, weight: e.target.value}}))}}/></div>);
    cells.push(<div key={i++} className="b-table__cell"><input type="text" value={this.state.tempBike.location} onChange={e=>{e.persist(); this.setState(s=>({tempBike:{...s.tempBike, location: e.target.value}}))}}/></div>);
    cells.push(<div key={i++} className="b-table__cell"><input type="text" value={this.state.tempBike.available} onChange={e=>{e.persist(); this.setState(s=>({tempBike:{...s.tempBike, available: e.target.value}}))}}/></div>);
    cells.push(<div key={i++} className="b-table__cell"><input type="text" value={this.state.tempBike.rate} onChange={e=>{e.persist(); this.setState(s=>({tempBike:{...s.tempBike, rate: e.target.value}}))}}/></div>);
    cells.push((
      <div key={i++} className="b-table__cell">
        <a className="b-link" onClick={()=>this.submitEditBike(bikeId)}>submit</a>
        <a className="b-link" onClick={()=>this.setState({editingBikeId: -1})}>cancel</a>
      </div>
    ));
    return cells;
  }

  componentDidMount(){
    fetch('http://narek-dev.com/bike-rentals-api/api/getBikes')
      .then(res => res.json())
      .then(json => this.setState({bikes: json}));
  }

  editBike(id){
    let bikeBeingEdited = this.state.bikes.find(b=>b.id === id);
    this.setState({editingBikeId: id, tempBike: {...bikeBeingEdited}});
  }

  addBike(){
    this.setState({editingBikeId: 0, tempBike: {...this.emptyBike}});
  }

  submitDeleteBike(id){
    this.setState(s=>{
      let idx = s.bikes.findIndex(b=>b.id===id);
      s.bikes.splice(idx, 1);
      return s;
    });
    fetch(`http://narek-dev.com/bike-rentals-api/api/deleteBike?id=${id}`)
      .then(res => res.json())
      .then(json => console.log(json));
  }

  submitEditBike(id){
    this.setState(s=>{
      s.editingBikeId = -1;
      if(id === 0){
        s.bikes.push(s.tempBike);
        return s;
      }
      let idx = s.bikes.findIndex(b=>b.id===id);
      s.bikes[idx] = s.tempBike;
      return s;
    });

    let temp = this.state.tempBike;
    let formData = new FormData();
    formData.append("id", id);
    formData.append("model", temp.model);
    formData.append("color", temp.color);
    formData.append("weight", temp.weight);
    formData.append("location", temp.location);
    formData.append("available", temp.available);
    formData.append("rate", temp.rate);
    fetch(`http://narek-dev.com/bike-rentals-api/api/editBike`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {
        // if item added, update the id in UI
        if(id===0)
          this.setState(s=>{
            let idx = s.bikes.findIndex(b=>b.id===0);
            s.bikes[idx].id = json.status.Bike.id;
            return s;
          });
        console.log(json)
      });
  }

}
