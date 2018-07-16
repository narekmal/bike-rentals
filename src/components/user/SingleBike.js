import React, { Component } from 'react';
import config from '../../Config';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker.css';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getBikes} from '../../actions/bikeActions';

const mapStateToProps = state => ({ ...state }); 
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( class SingleBike extends Component {

  state={
    loadingAdditionalInfo: null,
    rating:{
      status: '',

      currentRating: null,

      selectedRating: null,
      submitting: null
    },
    reservation:{
      status: '',

      selectedPeriodStart: undefined,
      selectedPeriodEnd: undefined,
      submitting: false
    }
  }

  render() {
    let bike;
    if(this.props.bikes)
      bike = this.props.bikes.find(b=>b.id==this.props.match.params.id);

    let ratingStatus = this.state.rating.status;
    let resStatus = this.state.reservation.status;

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
                  <div className="b-bike__info-item"><span className="b-bike__info-label">Avg. Rating:</span>{bike['avg. rating']}</div>
                  <div className="b-bike__info-item"><span className="b-bike__info-label">Currently Available:</span>{bike.available}</div>
                </div>
              </div>

              <div className="b-bike__bottom">
                <div className="b-bike__bottom-inner">

                  { this.state.loadingAdditionalInfo &&
                    <div className="b-bike__bottom-loading">loading info...</div> }

                  { this.state.loadingAdditionalInfo === false &&
                    <div className="b-bike__bottom-rating">
                      <div className="b-bike__bottom-label">{ratingStatus == "HAS_RATED" ? "Your rating:" : "Rate the bike:"}</div>
                      <div>{ratingStatus == "HAS_RATED" ? this.state.rating.currentRating : (ratingStatus == "HASNT_RESERVED" ? "(you haven't used this bike)" : "")}</div>
                      { ratingStatus == "CAN_RATE" && this.state.rating.submitting == null && 
                        <form className="b-bike__bottom-form" onSubmit={this.onRatingSubmit.bind(this)} action="">
                          <input type="radio" name="rating" value="1" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 1}}))} />
                          <input type="radio" name="rating" value="2" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 2}}))} />
                          <input type="radio" name="rating" value="3" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 3}}))} />
                          <input type="radio" name="rating" value="4" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 4}}))} />
                          <input type="radio" name="rating" value="5" onClick={()=>this.setState(s=>({rating: {...s.rating, selectedRating: 5}}))} />
                          <input type="submit" value="Submit"/>
                        </form>}
                      { ratingStatus == "CAN_RATE" && this.state.rating.submitting && 
                        <div>submitting...</div>}
                    </div> }

                  { this.state.loadingAdditionalInfo === false &&
                    <div className="b-bike__bottom-reservation">
                      <div className="b-bike__bottom-label">{resStatus == "CAN_BE_RESERVED" ? "Reserve the bike:" : "You have reserved this bike:"}</div>
                      { resStatus == "CAN_BE_RESERVED" && !this.state.reservation.submitting &&
                        <div className="b-bike__bottom-res-form">
                          <DatePicker 
                            placeholderText="Start" selected={this.state.reservation.selectedPeriodStart} 
                            onChange={e=>this.setState(s=>({reservation: {...s.reservation, selectedPeriodStart: e}})) } />
                          <DatePicker 
                            placeholderText="End" selected={this.state.reservation.selectedPeriodEnd} 
                            onChange={e=>this.setState(s=>({reservation: {...s.reservation, selectedPeriodEnd: e}})) } />
                          <button onClick={this.onReserveClick.bind(this)}>Reserve</button>
                        </div>}
                      { resStatus == "CURRENT_USER_RESERVED" && !this.state.reservation.submitting &&
                        <div><button onClick={this.onCancelResClick.bind(this)}>Cancel Reservation</button></div>}
                      { this.state.reservation.submitting &&
                        <div>processing...</div>}
                      
                    </div> }

                </div>
                
              </div>
            </div>
          </div>
        </div>}

      </div>
    )
  }

  componentDidMount(){

    this.setState({loadingAdditionalInfo: true});

    let formData = new FormData();
    formData.append("userId", this.props.auth.userId);
    formData.append("bikeId", this.props.match.params.id);
    
    fetch(`${config.apiBaseUrl}/api/getBikeAdditionalInfo`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {

        console.log(json);
        this.setState(s=>({...s, loadingAdditionalInfo: false, 
          rating: {
            ...s.rating,
            status: json.ratingStatus,
            currentRating: json.rating,
          },
          reservation: {
            ...s.reservation,
            status: json.reservationStatus
          }
        }))

      })
      .catch(err => console.log(err));
  }

  onRatingSubmit(e){
    e.preventDefault();

    if(!this.state.rating.selectedRating)
      return;

    this.setState(s=>({...s, rating:{...s.rating, submitting: true}}));

    let formData = new FormData();
    formData.append("userId", this.props.auth.userId);
    formData.append("bikeId", this.props.match.params.id);
    formData.append("rating", this.state.rating.selectedRating);
    
    fetch(`${config.apiBaseUrl}/api/rateBike`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {

        console.log(json);
        this.setState(s=>({ 
          rating: {
            ...s.rating,
            status: 'HAS_RATED',
            currentRating: this.state.rating.selectedRating,
          },
        }))

      })
      .catch(err => err.text().then(errorMessage => console.log(errorMessage)));
  }

  onCancelResClick(){

    this.setState(s=>({...s, reservation:{...s.reservation, submitting: true}}));

    let formData = new FormData();
    formData.append("userId", this.props.auth.userId);
    formData.append("bikeId", this.props.match.params.id);
    
    fetch(`${config.apiBaseUrl}/api/cancelBikeReservation`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {

        console.log(json);
        this.setState(s=>({ 
          reservation: {
            ...s.reservation,
            submitting: false,
            status: 'CAN_BE_RESERVED'
          },
        }))

      })
      .catch(err => err.text().then(errorMessage => console.log(errorMessage)));
  }

  onReserveClick(){

    this.setState(s=>({...s, reservation:{...s.reservation, submitting: true}}));

    let formData = new FormData();
    formData.append("userId", this.props.auth.userId);
    formData.append("bikeId", this.props.match.params.id);
    formData.append("periodStart", this.state.reservation.selectedPeriodStart.format("YYYY/MM/DD"));
    formData.append("periodEnd", this.state.reservation.selectedPeriodEnd.format("YYYY/MM/DD"));
    
    fetch(`${config.apiBaseUrl}/api/reserveBike`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {

        console.log(json);
        this.setState(s=>({ 
          reservation: {
            ...s.reservation,
            submitting: false,
            status: 'CURRENT_USER_RESERVED'
          },
        }))

      })
      .catch(err => err.text().then(errorMessage => console.log(errorMessage)));
  }

}));

