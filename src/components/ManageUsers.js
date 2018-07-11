import React, { Component } from 'react';

export default class ManageUsers extends Component {

  state = {
    editingItemId: -1, // -1 no editing, 0 adding
    tempItem: {...this.emptyItem},
    items: []
  }

  emptyItem = {id: 0, name: '', password: '', role: ''}

  render() {
    let tableHeaderCells, tableRows = [];
    if(this.state.items.length !== 0){
      tableHeaderCells = Object.keys(this.state.items[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      tableHeaderCells.push(<div key="-1" className="b-table__header-cell">Actions</div>);
      tableRows = this.state.items.map(b=>{
        if(b.id === this.state.editingItemId)
          return this.getEditRow();
        let cells = Object.values(b).map((v,i)=><div key={i} className="b-table__cell">{v}</div>);
        cells.push(
          <div key="-1" className="b-table__cell">
            <a className="b-link" onClick={()=>this.editItem(b.id)}>edit</a>
            <a className="b-link" onClick={()=>this.submitDeleteItem(b.id)}>delete</a>
          </div>);
        return cells;
      });
      if(this.state.editingItemId === 0) // adding item
        tableRows.push(this.getEditRow());
    }
    return (
      <div className="l-pane">
        <div className="b-table" style={{gridTemplateColumns: 'repeat(5, 1fr)'}}>
          {tableHeaderCells}
          {tableRows}
        </div>
        <div style={{textAlign: "left", marginTop: 25}}><a className="b-link" onClick={()=>this.addItem()}>add user</a></div>
      </div>
    )
  }

  getEditRow() {
    return (
      <form style={{display: "contents"}} key="editform">
        <div className="b-table__cell">{this.state.tempItem.id}</div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.name} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, name: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.password} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, password: e.target.value}}))}}/></div>
        <div className="b-table__cell"><input type="text" value={this.state.tempItem.role} onChange={e=>{e.persist(); this.setState(s=>({tempItem:{...s.tempItem, role: e.target.value}}))}}/></div>
        <div className="b-table__cell">
          <a className="b-link" onClick={()=>this.submitEditItem()}>submit</a>
          <a className="b-link" onClick={()=>this.setState({editingItemId: -1})}>cancel</a>
        </div>
      </form>
    );
  }

  componentDidMount(){
    fetch('http://narek-dev.com/bike-rentals-api/api/getUsers')
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
    fetch(`http://narek-dev.com/bike-rentals-api/api/deleteUser?id=${id}`)
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
    formData.append("name", temp.name);
    formData.append("password", temp.password);
    formData.append("role", temp.role);
    fetch(`http://narek-dev.com/bike-rentals-api/api/editUser`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {
        // if item added, update the id in UI
        if(id===0)
          this.setState(s=>{
            let idx = s.items.findIndex(b=>b.id===0);
            s.items[idx].id = json.status.User.id;
            return s;
          });
        console.log(json)
      });
  }

}
