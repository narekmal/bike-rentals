import React, { Component } from 'react'

export default class Selectable extends Component {
  state = {selected : -1};

  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, nextState);
    return true;
  }

  render() {
    let rows = this.props.data.map((item, index) => (
      <tr key={index} onClick={e=>this.setState({selected: index})} style={{backgroundColor: this.state.selected === index ? 'red' : 'white'}}>
        <td>{item.first}</td>
        <td>{item.second}</td>
      </tr>
    ));

    return (
      <table><tbody>{rows}</tbody></table>
    )
  }
}
