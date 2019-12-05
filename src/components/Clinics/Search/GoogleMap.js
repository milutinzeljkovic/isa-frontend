import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: "relative"

  };

class GoogleMap extends Component {

    renderUsersLocation(location) { 
        console.log(location);
        
       /* const { latitude, longitude } = location;
        return  <Marker key={'user'} id={10} position={{
            lat: latitude,
            lng: longitude
          }}
          onClick={() => console.log("You clicked me!")} />*/
    }

    renderMarkers(clinics) {        
        return clinics.map((clinic, index) => {
            return <Marker key={index} id={index} position={{
             lat: clinic.lat,
             lng: clinic.lng,
            }}
           // onClick={() => this.handleMarkerClick(clinic)} 
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
           />
          })
    }

    render() {
        return (   
            <div className ='mapWrap' >
                <Map
                    google={this.props.google}
                    zoom={13}
                    style={mapStyles}
                    center={this.props.center}
                    initialCenter={this.props.center}>
                    {this.renderUsersLocation(this.props.usersLocation)}
                    { this.props.clinics.all !== undefined ?  this.renderMarkers(this.props.clinics.all) : ''}
                </Map>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        usersLocation: state.usersLocation,
        clinics: state.clinics
    }
}

export default connect(mapStateToProps, {})(GoogleApiWrapper({
    apiKey: 'AIzaSyAq06l5RUVfib62IYRQacLc-KAy0XIWAVs'
  })(GoogleMap))