import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: "relative"

  };

class GoogleMap extends Component {
    render() {
        return (   
            <div className ='mapWrap' >
                <Map
                    google={this.props.google}
                    zoom={13}
                    style={mapStyles}
                    >
                    
                    
                </Map>
            </div>
        )
    }
}

export default connect(null, {})(GoogleApiWrapper({
    apiKey: 'AIzaSyAq06l5RUVfib62IYRQacLc-KAy0XIWAVs'
  })(GoogleMap))