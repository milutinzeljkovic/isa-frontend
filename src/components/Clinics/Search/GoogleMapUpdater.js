import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';

class GoogleMapUpdater extends Component {

    resetCenter = () => {
        this.setState({
            center: {
                lat : 45.25167,
                lng : 19.83694
            }
        })
    }

    constructor(props){
        super(props);
        this.state = {
            center: {
                lat : 45.25167,
                lng : 19.83694
            }
        }
    }

    componentDidUpdate(){
    
        if(this.props.clickedClinic !== undefined){
            let lat1 = this.props.clickedClinic.lat;
            let lat2= this.state.center.lat;
            let lng1 = this.props.clickedClinic.lng;
            let lng2= this.state.center.lng;

            if(lat1 !== lat2 && lng1 !== lng2){
                this.setState({
                    center: {
                        lat: lat1,
                        lng: lng1
                    }
                })
            }
        }else{
            //this.resetCenter();
        }
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <GoogleMap center = {this.state.center} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        clickedClinic: state.clinics.selectedClinic
    }
}

export default connect(mapStateToProps)(GoogleMapUpdater);