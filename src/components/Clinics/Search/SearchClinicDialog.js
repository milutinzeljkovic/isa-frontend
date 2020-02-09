import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'loadsh';
import { MDBCard, MDBListGroup, MDBListGroupItem, MDBBadge, MDBRow, MDBCol } from "mdbreact";
import image from '../../../images/clinic.png';
import ExampleComponent from "react-rounded-image";
import ReactStars from 'react-stars'
import { searchClinics, rateClinic, showClinic } from '../../../actions/clinic';
import { fetchUsersLoction } from '../../../actions/location';
import GoogleMapUpdater from './GoogleMapUpdater';
import { appointmentHistory } from '../../../actions/appointment';
import { me } from '../../../actions/auth';

import ClinicDetail from './ClinicDetail';
import ClinicFilter from './ClinicFIlter';


class SearchClinicDialog extends Component {

    constructor(props){
        super(props);
        this.state = {
            clinicsLoaded: false,
            error: false,
            usersPosition: null,
            distanceAscending: true,
            nameAscending: true,
            starsAscending: true
        }
        this.filterByDistance = this.filterByDistance.bind(this);
    }

    distance = (lat1, lon1, lat2, lon2, unit) => {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit==="K") { dist = dist * 1.609344 }
            if (unit==="N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    sortByName = () =>{
        let asc = this.state.nameAscending;
        const newProps = this.props.clinics.all.sort(function(a, b) {
            a = a.name;
            b = b.name;
            return asc === false ? (a>b ? -1 : a<b ? 1 : 0) : (a<b ? -1 : a<b ? 1 : 0) 
        });
        this.props.clinics.all = newProps;
        this.setState({
            nameAscending: !this.state.nameAscending
        })
    }
    
    sortByStars = () =>{
        let asc = this.state.starsAscending;
        const newProps = this.props.clinics.all.sort(function(a, b) {
            a = a.stars_count === null ? 0 : a.stars_count;
            b = b.stars_count === null ? 0 : b.stars_count;
            return asc === false ? (a>b ? -1 : a<b ? 1 : 0) : (a<b ? -1 : a<b ? 1 : 0) 
        });
        this.props.clinics.all = newProps;
        this.setState({
            starsAscending: !this.state.starsAscending
        })
    }

    filterByDistance = () => {
        const usersPosition = this.state.usersPosition;
        let old = this.props.clinics.all;
        let asc = this.state.distanceAscending;
        if(usersPosition === null)
            return;
        let distance = this.distance;
        let clinicsSorted = old.sort(function(a, b) {
            let dist1 = distance(usersPosition.lat, usersPosition.lng, a.lat, a.lng, 'K' ); 
            let distanceKm1 = parseFloat(dist1).toFixed(2);
            let dist2 = distance(usersPosition.lat, usersPosition.lng, b.lat, b.lng, 'K' ); 
            let distanceKm2 = parseFloat(dist2).toFixed(2);
            b = new Date(b.date);
            return  asc ? (distanceKm1 < distanceKm2 ? -1 : distanceKm1 < distanceKm2 ? 1 : 0):
                (distanceKm1 > distanceKm2 ? -1 : distanceKm1 < distanceKm2 ? 1 : 0)

        });                
        
        this.props.clinics.all = clinicsSorted;    
        this.setState({
            distanceAscending: !this.state.distanceAscending
        })
    }

    resetFilters = () => {
        this.props.searchClinics();
    }


    ratingChanged = async (newRating,clinic) => {
        await this.props.rateClinic(clinic.id,newRating)
        this.props.searchClinics();
    }


    clinicsLoaded = () => {
        return this.props.clinics === null ? false : true;
    }

    componentWillMount (){

        navigator.geolocation.getCurrentPosition((position) =>{
            this.setState({
                usersPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })           
            console.log('pozicija',position );
            
            
            return position;
        },(e)=>{
            
        },{timeout:10000});   

    }

    componentWillReceiveProps(){        
        this.setState({
            clinicsLoaded: true,
            clinics: this.props.clinics === null? null : this.props.clinics.all
        })
    }

    componentDidMount = async () => {
        await this.fetchPatientHistory();
        this.props.searchClinics();
        setTimeout(
            function() {                
                this.clinicsLoaded() === false ? 
                this.setState({
                    error: true,
                    clinicsLoaded: false
                })
                :
                this.setState({
                    error: false,
                    clinicsLoaded: true
                })
            }
            .bind(this),
            3000
        );

    }

    fetchPatientHistory = async () => {
        await this.props.me();
        if(this.props.currentUser !== undefined && this.props.currentUser.userable_type === 'App\\Patient'){
            await this.props.appointmentHistory(this.props.currentUser.userable_id);
        }else{
            if(this.props.currentUser === undefined){
                await this.props.me();
            }
        }
    }

    onClinicClickHandle = async clinic => {   
        await this.props.showClinic(clinic.id);
    }

    renderClinics(clinics){

        let canRateClinics = [];
        try{
            this.props.patientHistory.forEach(app => {
                canRateClinics.push(app.clinic_id);
            });
        }catch(e){
            
        }
        return _.map(clinics, (clinic,index) => {  
            let distanceKm = null;
            if(this.state.usersPosition !== null){
                let dist = this.distance(this.state.usersPosition.lat, this.state.usersPosition.lng, clinic.lat, clinic.lng, 'K' ); 
                distanceKm = parseFloat(dist).toFixed(2);
            }   
            
                  
            const canRate = canRateClinics.includes(clinic.id);           
            const starsValue = clinic.stars_count === null ? 0 : clinic.stars_count;            
            
            return(
                <MDBCard id ={ index === 0 ? 'clinic-card-0':  'clinic-card'}>
                <MDBListGroupItem 
                    key = {clinic.id}
                >  
                <MDBRow>
                    <MDBCol md="4">
                    <ExampleComponent
                            image={image}
                            roundedColor="#321124"
                            imageWidth="150"
                            imageHeight="150"
                            roundedSize="0"
                            />

                    <div class="d-inline-flex p-2 bd-highlight">
                        <ReactStars
                        count={5}
                        size={24}
                        edit={canRate}
                        onChange={ (newRating) => this.ratingChanged(newRating,clinic)}
                        value={parseInt(starsValue)}
                        color2={'#ffd700'} />
                    {
                        starsValue !== null ? 
                            <MDBBadge style={{height:"5%"}} color='blue'>{starsValue}</MDBBadge>
                        :
                        ''
                    }
                    </div>
                    </MDBCol>
                    <MDBCol md="8">
                    <div className="d-flex w-100 justify-content-between">
                        <h1 className="mb-1"  onClick = {() => this.onClinicClickHandle(clinic)} >{clinic.name}</h1>
                    </div>
                    <div>
                    <small className="text-muted">
                    <i className="fas fa-map-marker-alt"></i> {clinic.address} 
                    </small>

                    </div>
                    <MDBBadge dusk='badgeDetails'  tag="a" color="teal" onClick = {() => this.onClinicClickHandle(clinic)}>details <i className="fas fa-info"></i></MDBBadge>
                    {canRate ? <MDBBadge tag="a" style={{ margin: "1%" }} color="danger">visited</MDBBadge> : ''}
                    {distanceKm === null ? '' : <MDBBadge style={{ margin: "1%" }} color="blue" > {distanceKm} km <i class="fas fa-thumbtack"></i></MDBBadge> }
                    <p className="mb-1">{clinic.description}</p>
                    </MDBCol>
                </MDBRow>

                </MDBListGroupItem>
                </MDBCard>
            )
        })
    }


    render() {
        return (
            <div className = 'container'>
                {
                    this.state.clinicsLoaded === false && this.state.error === false 
                        ?
                        <div className = 'row'>
                            Loading
                        </div>
                        :
                    this.state.clinicsLoaded 
                        ? 
                        <div className = 'row'>
                            <div className="col-xl-8">
                                {
                                    this.props.clinics !== null && this.props.clinics.selectedClinic !==  undefined ? 
                                    <ClinicDetail clinic = {this.props.clinics.selectedClinic} />
                                    :
                                    <MDBCard id='clinics-card'>
                                    <MDBListGroup style={{ width: "100%" }} id = 'clinics_result'>
                                    <MDBListGroupItem id = 'clinic-card-0'>
                                        <table>
                                            <thead>
                                            <tr>
                                            <td>
                                                sort by:
                                            </td>
                                            <td>
                                            <MDBBadge tag="a" 
                                                color="blue"
                                                onClick = { () => this.filterByDistance()}
                                            >
                                            {this.state.distanceAscending === true? 'nearest' : 'farthest'}
                                            </MDBBadge>
                                            </td>
                                            <td>
                                                <MDBBadge tag="a" 
                                                    color="blue"
                                                    onClick = { () => this.sortByName()}
                                                >
                                                name
                                                <small>
                                                    {this.state.nameAscending === false ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
                                                </small> 
                                                </MDBBadge>
                                            </td>
                                            <td>
                                                <MDBBadge tag="a" 
                                                    color="blue"
                                                    onClick = { () => this.sortByStars()}
                                                >
                                                stars
                                                <small>
                                                    {this.state.starsAscending === false ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
                                                </small> 
                                                </MDBBadge>
                                            </td>
                                            <td>
                                            <MDBBadge tag="a" 
                                                    color="blue"
                                                    onClick = { () => this.resetFilters()}
                                                >
                                                reset 
                                            </MDBBadge> 
                                            </td>
                                            </tr>
                                            </thead>
                                        </table>
                                        
                                    </MDBListGroupItem>
                                                { this.props.clinics === null ? '' :  this.renderClinics(this.props.clinics.all)}
                                    </MDBListGroup>   
                                    </MDBCard>    
                                }                
                            </div>
                            <div className="col-xl-4" id = 'map-div'>
                                <MDBCard style={{ width: "100%", height: "90%" }} id= 'map-card'>
                                    { this.props.clinics === null ? ' ' : <GoogleMapUpdater usersPosition = {this.state.usersPosition} />}
                                </MDBCard> 
                                {this.props.clinics !== null && this.props.clinics.selectedClinic ===  undefined 
                                    ? 
                                    <ClinicFilter/> 
                                    : 
                                    ''
                                }

                            </div>
                    </div>
                    :
                    <div className = 'row'>
                        Connection error
                    </div>
                        
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        clinics: state.clinics,
        currentUser: state.auth.currentUser,
        patientHistory: state.appointments
    }
}

export default connect(mapStateToProps, { searchClinics, fetchUsersLoction, rateClinic, appointmentHistory, me, showClinic })(SearchClinicDialog);