import React, { Component } from 'react';
import '../styles/ManageBikes.css';

export default class ManageBikes extends Component {

  state = {
    editingItemId: -1, // -1 no editing, 0 adding
    tempItem: {...this.emptyItem},
    reservations: {
      itemId: -1,
      loading: false,
      data: []
    },
    items: []
  }

  emptyItem = {id: 0, model: '', photo: '', color: '', weight: '', location: '', available: 1, rate: 0}

  render() {
    let tableHeaderCells, tableRowCells;
    if(this.state.items.length !== 0){
      tableHeaderCells = Object.keys(this.state.items[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      tableHeaderCells.push(<div key="-1" className="b-table__header-cell">Reservations</div>);
      tableHeaderCells.push(<div key="-2" className="b-table__header-cell">Actions</div>);

      tableRowCells = this.state.items.map(b=>{
        if(b.id === this.state.editingItemId)
          return this.getEditRow();
        let cells = Object.values(b).map((v,i)=><div key={i} className="b-table__cell">{v}</div>);
        cells.push(
          <div key="-1" className="b-table__cell">
            <a className="b-link" onClick={()=>this.watchReservations(b.id)}>watch</a>
          </div>);
        cells.push(
          <div key="-2" className="b-table__cell">
            <a className="b-link" onClick={()=>this.editItem(b.id)}>edit</a>
            <a className="b-link" onClick={()=>this.submitDeleteItem(b.id)}>delete</a>
          </div>);
        return cells;
      });
      if(this.state.editingItemId === 0) // adding item
        tableRowCells.push(this.getEditRow());
    }

    let resTableHeaderCells, resTableRowCells;
    if(this.state.reservations.itemId > 0 && this.state.reservations.data.length > 0){
      resTableHeaderCells = Object.keys(this.state.reservations.data[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      resTableRowCells = this.state.reservations.data.map(r=>{
        let cells = Object.values(r).map((v,i)=><div key={i} className="b-table__cell">{v}</div>);
        return cells;
      });
    }

    return (
      <div className="l-pane">
        <div className="b-table" style={{gridTemplateColumns: 'repeat(10, 1fr)'}}>
          {tableHeaderCells}
          {tableRowCells}
        </div>
        <div style={{textAlign: "left", marginTop: 25}}><a className="b-link" onClick={()=>this.addItem()}>add bike</a></div>

        {this.state.reservations.itemId > 0 && 
        <div className="b-reservations">
          <div className="b-reservations__inner">
            <div className="b-reservations__title">Reservations for bike #{this.state.reservations.itemId}</div>
            {this.state.reservations.loading && 
            <div className="b-reservations__loading">loading...</div>}
            {!this.state.reservations.loading && this.state.reservations.data.length === 0 &&
            <div className="b-reservations__no-data">No reservations found</div>}
            {!this.state.reservations.loading && this.state.reservations.data.length > 0 &&
            <div className="b-reservations__table">
              <div className="b-table" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {resTableHeaderCells}
                {resTableRowCells}
              </div>
            </div>}
          </div>
        </div>}

      </div>
    )
  }

  getEditRow() {
    return (
      <form key={'fictivecontainer'} style={{display: "contents"}}>
        <div className="b-table__cell">{this.state.tempItem.id}</div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.model} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, model: e.target.value}}))}}/></div>
        <div className="b-table__cell"></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.color} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, color: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.weight} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, weight: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.location} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, location: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.available} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, available: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.rate} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, rate: e.target.value}}))}}/></div>
        <div className="b-table__cell"></div>
        <div className="b-table__cell">
          <a className="b-link" onClick={()=>this.submitEditItem()}>submit</a>
          <a className="b-link" onClick={()=>this.setState({editingItemId: -1})}>cancel</a>
        </div>
      </form>
    );
  }

  componentDidMount(){
    fetch('http://narek-dev.com/bike-rentals-api/api/getBikes')
      .then(res => res.json())
      .then(json => this.setState({items: json}));
  }

  editItem(id){
    let bikeBeingEdited = this.state.items.find(b=>b.id === id);
    this.setState({editingItemId: id, tempItem: {...bikeBeingEdited}});
  }

  addItem(){
    this.setState({editingItemId: 0, tempItem: {...this.emptyItem}});
  }

  submitDeleteItem(id){
    this.setState(s=>{
      let idx = s.items.findIndex(b=>b.id===id);
      s.items.splice(idx, 1);
      return s;
    });
    fetch(`http://narek-dev.com/bike-rentals-api/api/deleteBike?id=${id}`)
      .then(res => res.json())
      .then(json => console.log(json));
  }

  submitEditItem(){
    let id = this.state.editingItemId;
    this.setState(s=>{
      s.editingItemId = -1;
      if(id === 0){
        s.items.push(s.tempItem);
        return s;
      }
      let idx = s.items.findIndex(b=>b.id===id);
      s.items[idx] = s.tempItem;
      return s;
    });

    let temp = this.state.tempItem;
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
            let idx = s.items.findIndex(b=>b.id===0);
            s.items[idx].id = json.status.Bike.id;
            return s;
          });
        console.log(json)
      });
  }

  watchReservations(id) {
    this.setState(s=>({reservations:{...s.reservations, itemId: id, loading: true, data: []}}));

    let formData = new FormData();
    formData.append("bikeId", id);
    fetch(`http://narek-dev.com/bike-rentals-api/api/getBikeReservations`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {
        this.setState(s=>({reservations: {...s.reservations, loading: false, data: json}}));
      });
  }

}
