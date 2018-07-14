import React, { Component } from 'react';
import config from '../../Config';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getBikes} from '../../actions/bikeActions';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class BikesList extends Component {

  render() {

    let tableHeaderCells, tableRowCells, tableColumnCount;
    if(this.props.bikes !== null){
      tableHeaderCells = Object.keys(this.props.bikes[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
      tableHeaderCells.push(<div key="-1" className="b-table__header-cell">Actions</div>);
      tableColumnCount = tableHeaderCells.length;

      tableRowCells = this.props.bikes.map(b=>{

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
          <div key="-1" className="b-table__cell b-table__cell--links">
            <a className="u-link" onClick={()=>{}}>view details</a>
            <a className="u-link" onClick={()=>{}}>view on map</a>
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

}));

