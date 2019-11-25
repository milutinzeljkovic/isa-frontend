import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

class GoogleMap extends Component {
  
  

  componentDidMount(){
    this.renderMap();
  }

  componentDidUpdate(){
    this.renderMap();
  }

  renderMap() {
    var google = window.google;

    const lat = this.props.selectedLocation ? this.props.selectedLocation.lat : 0;
    const lng = this.props.selectedLocation ? this.props.selectedLocation.lng : 0;

    let myMap = new google.maps.Map(this.refs.map, {
      zoom:17,
      center:{
        lat,
        lng
      }
    });

    new google.maps.Marker({
      position: myMap.center,
      map: myMap,
      icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      zoomControl: false,
    });
  }

  renderView() {
    console.log(this.props.selectedLocation);
    if(this.props.selectedLocation === null) {
      return (
        <Fragment>
          <img src="https://thumbs.dreamstime.com/z/funny-maze-game-delivery-driver-find-hotel-small-city-vector-help-map-cartoon-town-cover-design-67336466.jpg" style={{width: 400, height: 400 }} alt="map" />
          <div ref="map" id="map" style={{width: 400, height: 400, display: 'none' }}></div>
        </Fragment>
      );
    } else {
      return <div ref="map" id="map" style={{width: 400, height: 400, display: 'block' }}></div>;
    }
    
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.selectedLocation
    }
}

export default connect(mapStateToProps, {})(GoogleMap);
