import React, { Component } from 'react';
import config from '../../Config';
import {NavLink} from 'react-router-dom';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class BikesList extends Component {

  render() {

    let tableHeaderCells, tableRowCells, tableColumnCount;
    if(this.props.bikes !== null){
      let filtered = this.props.bikes.filter(b=>{
        let colorPass = this.props.filters.color == '' || b.color.toLowerCase().indexOf(this.props.filters.color.toLowerCase()) != -1;
        let modelPass = this.props.filters.model == '' || b.model.toLowerCase().indexOf(this.props.filters.model.toLowerCase()) != -1;
        let minWeightPass = this.props.filters.minWeight == '' || parseInt(b.weight) >= parseInt(this.props.filters.minWeight);
        let maxWeightPass = this.props.filters.maxWeight == '' || parseInt(b.weight) <= parseInt(this.props.filters.maxWeight);
        let minRatingPass = this.props.filters.minRating == '' || parseInt(b['avg. rating']) > parseInt(this.props.filters.minRating);
        let nearLocPass = true;
        if(this.props.filters.nearLoc != ''){
          let split = this.props.filters.nearLoc.split(" ");
          let lat = parseFloat(split[0]);
          let long = parseFloat(split[1]);
          let blat = parseFloat(b.latitude);
          let blong = parseFloat(b.longitude);
          let margin = 0.004440; //0.004431
          nearLocPass = Math.abs(lat-blat) < margin && Math.abs(long - blong) < margin;
        }
        return colorPass && modelPass && minWeightPass && maxWeightPass && minRatingPass && nearLocPass; 
      });
      if(filtered.length > 0){

        tableHeaderCells = Object.keys(filtered[0]).map((k,i)=><div key={i} className="b-table__header-cell">{k}</div>);
        tableHeaderCells.push(<div key="-1" className="b-table__header-cell b-table__header-cell--links">Actions</div>);
        tableColumnCount = tableHeaderCells.length;

        tableRowCells = filtered.map(b=>{

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
            <div key="-1" className="b-table__cell b-table__cell--links-v">
              <NavLink className="u-link" to={`/user/bike/${b.id}`}>view details</NavLink>
              <a className="u-link" onClick={()=>{this.props.onBikeHighlight(b.id)}}>view on map</a>
            </div>);
            
          return cells;

        });

      }
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

