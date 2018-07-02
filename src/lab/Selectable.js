import React, { Component } from 'react'

export default class Selectable extends Component {
  state = {
    data: this.props.data,
    selected : -1
  };

  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, nextState);
    return true;
  }

  handleTrigger(){
    this.setState(s=>({data: [...s.data, {first: 'test'}]}));
    console.log(this.refs.firstInput.value);
  }

  render() {
    let rows = this.state.data.map((item, index) => (
      <tr key={index} onClick={e=>this.setState({selected: index})} style={{backgroundColor: this.state.selected === index ? 'red' : 'white'}}>
        <td>{item.first}</td>
        <td>{item.second}</td>
      </tr>
    ));

    return (
      <table>
        <tbody>
          {rows}
          <tr>
            <td><input type="text" ref='firstInput'/></td>
            <td><input type="text"/></td>
            <td><button onClick={this.handleTrigger.bind(this)}>trigger</button></td></tr>
        </tbody>
      </table>
    )
  }
}
