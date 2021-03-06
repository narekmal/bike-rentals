import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = () => ({});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class BikesMap extends Component {

  static defaultProps = {
    center: {
      lat: 40.812180,
      lng: 44.488464
    },
    zoom: 15
  };

  render() {
    let bikeIcons;
    if(this.props.bikes){
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
      if(filtered.length > 0)
        bikeIcons = filtered.map((b,i)=>(
          <BikeIcon key={i} lat={b.latitude} lng={b.longitude} bikeId={b.id} selected={this.props.highlightedBikeId == b.id} />
        ));
    }
      
    return (
      <div className="l-pane" style={{ height: '350px'}}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {bikeIcons}
        </GoogleMapReact>
      </div>
    );
  }

}));

const BikeIcon = withRouter(class extends Component {

  handleClick(e){
    this.props.history.push(`/user/bike/${this.props.bikeId}`);
  }

  render(){
    return (
      <div style={{cursor: 'pointer'}} onClick={this.handleClick.bind(this)} >
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="45px" fill={this.props.selected ? '#a00503' : 'black'} viewBox="0 0 263.345 263.345" xmlSpace="preserve">
          <g>
            <g>
              <path d="M115.156,116.719l3.771,1.263l-3.717-31.533l-5.407,4.915C114.808,98.728,116.792,107.854,115.156,116.719z"/>
              <path d="M106.062,113.681c0.707-5.535-0.497-11.136-3.351-15.873L90.85,108.596L106.062,113.681z"/>
              <path d="M160.921,99.922c-6.548,11.875-2.221,26.861,9.661,33.41c3.631,2.004,7.729,3.064,11.85,3.064
                c8.97,0,17.235-4.875,21.562-12.723c6.549-11.875,2.218-26.864-9.665-33.414c-3.631-2.002-7.729-3.064-11.845-3.064
                c-0.08,0-0.159,0.014-0.243,0.014l4.854,23.632c0.523,2.562-1.129,5.062-3.687,5.586c-0.322,0.068-0.645,0.096-0.957,0.096
                c-2.198,0-4.172-1.542-4.634-3.78l-4.845-23.632C167.927,91.223,163.646,94.979,160.921,99.922z"/>
              <path d="M69.817,132.06c3.631,2.007,7.731,3.062,11.852,3.062c8.87,0,17.033-4.772,21.396-12.461l-22.869-7.647
                c-1.592-0.53-2.787-1.869-3.129-3.512c-0.345-1.645,0.205-3.346,1.447-4.478l17.84-16.22c-0.88-0.656-1.792-1.276-2.782-1.815
                c-3.631-2.002-7.731-3.064-11.847-3.064c-8.975,0-17.238,4.875-21.562,12.727C53.606,110.521,57.939,125.509,69.817,132.06z"/>
              <polygon points="158.401,69.115 124.021,80.05 127.773,112.089 		"/>
              <path d="M29.758,133.782c0.665,1.848,6.611,18.291,10.725,25.245c21.032,39.996,49.875,74.216,85.737,101.751
                c0.651,0.757,1.458,1.382,2.38,1.835c0.812,0.4,1.691,0.635,2.585,0.695c0.233,0.027,0.474,0.037,0.707,0.037
                c1.185,0,2.384-0.294,3.479-0.85c0.777-0.392,1.459-0.934,2.028-1.577c80.218-61.429,95.848-125.815,96.426-128.331
                c2.367-9.033,3.57-18.071,3.57-26.864C237.396,47.427,189.969,0,131.673,0C73.376,0,25.949,47.427,25.949,105.728
                c0,8.641,1.148,17.48,3.417,26.29C29.419,132.615,29.548,133.208,29.758,133.782z M98.137,80.701
                c1.92,1.06,3.685,2.294,5.316,3.645l10.394-9.448l-1.176-9.974h-6.438c-2.915,0-5.281-2.366-5.281-5.281
                c0-2.914,2.366-5.28,5.281-5.28h20.15c2.915,0,5.281,2.366,5.281,5.28c0,2.915-2.366,5.281-5.281,5.281h-4.186l0.653,5.572
                l43.453-13.821l-0.612-2.978c-4.162,1.668-10.006,3.323-15.84,2.644c-2.6-0.301-4.457-2.653-4.153-5.248
                c0.299-2.595,2.665-4.452,5.246-4.154c7.309,0.833,15.611-4.132,15.7-4.182c1.311-0.803,2.939-0.913,4.35-0.294
                c1.409,0.616,2.436,1.872,2.753,3.383l6.558,31.972c0.724-0.049,1.442-0.072,2.175-0.072c5.712,0,11.393,1.468,16.423,4.238
                c16.442,9.073,22.439,29.827,13.376,46.271c-5.992,10.851-17.427,17.6-29.846,17.6c-5.712,0-11.393-1.466-16.423-4.237
                c-16.442-9.071-22.449-29.825-13.376-46.27c4.083-7.4,10.688-12.886,18.406-15.633l-1.913-9.334l-40.765,57.195
                c-0.019,0.03-0.049,0.049-0.068,0.077c-0.023,0.035-0.042,0.077-0.072,0.11c-0.114,0.145-0.252,0.268-0.38,0.401
                c-0.082,0.082-0.154,0.177-0.245,0.254l-0.004,0.004c-0.009,0.009-0.019,0.014-0.028,0.019c-0.178,0.149-0.374,0.278-0.569,0.401
                c-0.054,0.035-0.096,0.073-0.147,0.105c-0.04,0.019-0.077,0.032-0.117,0.054c-0.095,0.051-0.196,0.086-0.296,0.128
                c-0.214,0.096-0.434,0.182-0.663,0.243c-0.126,0.035-0.254,0.063-0.382,0.086c-0.11,0.021-0.215,0.059-0.329,0.072
                c-0.182,0.019-0.364,0.028-0.542,0.028c-0.005,0-0.005,0-0.009,0l0,0l0,0l0,0l0,0l0,0h-0.005c-0.296,0-0.588-0.028-0.87-0.08
                c-0.17-0.035-0.339-0.091-0.507-0.145h-0.004c-0.038-0.009-0.077-0.005-0.114-0.019l-10.863-3.633
                c-0.21,0.427-0.392,0.861-0.621,1.281c-5.995,10.868-17.429,17.616-29.851,17.616c-5.712,0-11.39-1.47-16.421-4.237
                c-16.444-9.07-22.448-29.827-13.376-46.272c5.993-10.867,17.43-17.616,29.849-17.616C87.429,76.461,93.106,77.924,98.137,80.701z"
                />
            </g>
          </g>
        </svg>
      </div>
    );
  }
})
