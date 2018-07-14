import React, { Component } from 'react';
import config from '../../Config.js';

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

  emptyItem = {id: 0, model: '', photo: null, color: '', weight: '', location: '', available: 1, rate: 0}

  render() {
    let tableHeaderCells, tableRowCells;
    if(this.state.items.length !== 0){
      tableHeaderCells = Object.keys(this.state.items[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      tableHeaderCells.push(<div key="-1" className="b-table__header-cell">Reservations</div>);
      tableHeaderCells.push(<div key="-2" className="b-table__header-cell">Actions</div>);

      tableRowCells = this.state.items.map(b=>{
        if(b.id === this.state.editingItemId)
          return this.getEditRow();

        let cells = Object.keys(b).map( (k,i) => {
          let cellContent;
          let style = {};
          let className = 'b-table__cell';

          if(k === 'photo'){
            style = b[k] != null ? {backgroundImage: `url(${config.apiBaseUrl}/${b[k]})`} : {};
            cellContent = '';
            className += ' b-table__cell--img';
          }
          else
            cellContent = b[k];
            
          return (<div key={i} style={style} className={className}>{cellContent}</div>)
        });

        cells.push(
          <div key="-1" className="b-table__cell">
            <a className="u-link" onClick={()=>this.watchReservations(b.id)}>watch</a>
          </div>);
        cells.push(
          <div key="-2" className="b-table__cell">
            <a className="u-link" onClick={()=>this.editItem(b.id)}>edit</a>
            <a className="u-link" onClick={()=>this.submitDeleteItem(b.id)}>delete</a>
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
        <div style={{textAlign: "left", marginTop: 25}}><a className="u-link" onClick={()=>this.addItem()}>add bike</a></div>

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
        <div className="b-table__cell b-table__cell--img"><div className="b-table__file-input-wrapper"><button onClick={e=>{this.uploadInput.click(); e.preventDefault();}}>Choose Photo</button><input ref={el=>this.uploadInput = el} style={{display: 'none'}} type="file" onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, photo: e.target.files[0]}}))}} /></div></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.color} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, color: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.weight} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, weight: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.location} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, location: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.available} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, available: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.rate} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, rate: e.target.value}}))}}/></div>
        <div className="b-table__cell"></div>
        <div className="b-table__cell">
          <a className="u-link" onClick={()=>this.submitEditItem()}>submit</a>
          <a className="u-link" onClick={()=>this.setState({editingItemId: -1})}>cancel</a>
        </div>
      </form>
    );
  }

  componentDidMount(){
    fetch(`${config.apiBaseUrl}/api/getBikes`)
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
    fetch(`${config.apiBaseUrl}/api/deleteBike?id=${id}`)
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
    formData.append("photo", temp.photo);
    formData.append("color", temp.color);
    formData.append("weight", temp.weight);
    formData.append("location", temp.location);
    formData.append("available", temp.available);
    formData.append("rate", temp.rate);
    fetch(`${config.apiBaseUrl}/api/editBike`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {
        // update photo in UI, and the id if newly added 
        this.setState(s=>{
          let idx = s.items.findIndex(b=>b.id===id);
          s.items[idx].id = json.status.Bike.id;
          s.items[idx].photo = json.status.Bike.photo;
          return s;
        });
        console.log(json)
      });
  }

  watchReservations(id) {
    this.setState(s=>({reservations:{...s.reservations, itemId: id, loading: true, data: []}}));

    let formData = new FormData();
    formData.append("bikeId", id);
    fetch(`${config.apiBaseUrl}/bike-rentals-api/api/getBikeReservations`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {
        this.setState(s=>({reservations: {...s.reservations, loading: false, data: json}}));
      });
  }

}
