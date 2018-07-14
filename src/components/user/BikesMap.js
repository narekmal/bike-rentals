import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class BikesMap extends Component {
  static defaultProps = {
    center: {
      lat: 40.812180,
      lng: 44.488464
    },
    zoom: 15
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="l-pane" style={{ height: '550px'}}>
        <GoogleMapReact
          //bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}