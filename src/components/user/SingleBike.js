import React, { Component } from 'react';
import config from '../../Config';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getBikes} from '../../actions/bikeActions';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class SingleBike extends Component {

  state={
    bikeAdditionalInfo:{
      loading: null
    },
    rating:{
      selectedRating: null,
      submitting: false,
      submitted: false
    },
    reservation:{
      submitting: false
    }
  }

  render() {
    let bike;
    if(this.props.bikes)
      bike = this.props.bikes.find(b=>b.id==this.props.match.params.id);
    return (
      <div>

        {this.props.bikes && 
        <div className="l-pane">
          <div className="b-bike">
            <div className="b-bike__inner">
              <div className="b-bike__top">
                <div className="b-bike__img" style={{backgroundImage: `url(${config.apiBaseUrl}/${bike.photo})`}}></div>
                <div className="b-bike__info">
                  <div className="b-bike__info-item"><span className="b-bike__info-label">Id:</span>{bike.id}</div>
                  <div className="b-bike__info-item"><span className="b-bike__info-label">Model:</span>{bike.model}</div>
                  <div className="b-bike__info-item"><span className="b-bike__info-label">Color:</span>{bike.color}</div>
                  <div className="b-bike__info-item"><span className="b-bike__info-label">Weight:</span>{bike.weight}</div>
                  <div className="b-bike__info-item"><span className="b-bike__info-label">Avg. Rating:</span>{bike.rating}</div>
                </div>
              </div>
              <div className="b-bike__bottom">
                { this.state.bikeAdditionalInfo.loading &&
                  <div className="b-bike__bottom-loading">loading...</div> }
                { this.state.bikeAdditionalInfo.loading &&
                  <div className="b-bike__bottom-loading">loading...</div> }
                <div className="b-bike__bottom-rating">
                  <div className="b-bike__bottom-label">Rate the bike:</div>
                  <form className="b-bike__bottom-form" action="">
                    <input type="radio" name="rating" value="1" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 1}}))} />
                    <input type="radio" name="rating" value="2" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 2}}))} />
                    <input type="radio" name="rating" value="3" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 3}}))} />
                    <input type="radio" name="rating" value="4" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 4}}))} />
                    <input type="radio" name="rating" value="5" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 5}}))} />
                    <input type="submit" value="submit"/>
                  </form>
                </div>
                <div className="b-bike__bottom-reservation">
                  <div className="b-bike__bottom-label">Reserve the bike:</div>
                  <div>
                    <button>reserve</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}

      </div>
    )
  }

  componentDidMount(){
    // fetch(`${config.apiBaseUrl}/api/getBikes`)
    //   .then(res => res.json())
    //   .then(json => this.setState({items: json}));
  }

}));

