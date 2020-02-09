import React, { Component } from 'react';
import {XYPlot, VerticalBarSeries, XAxis, YAxis} from 'react-vis';
import _ from 'loadsh';
import { connect } from 'react-redux';
import {getClinicDoctors, clinicAverageRating, getDoctorsAverageRating, getMoneyEarned, getMonthlyReport, getWeeklyReport} from '../../actions/clinicAdmin';
import {MDBTable, MDBTableBody, MDBTableHead, MDBBtn} from 'mdbreact'
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';


class BusinessInformation extends Component {

    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        }
    }
    

    async componentWillMount(){
        await this.props.clinicAverageRating();
        await this.props.getDoctorsAverageRating();
        await this.props.getMonthlyReport();
        await this.props.getWeeklyReport();
        await this.props.getClinicDoctors();
    }

    handleStartDateChange = (e) => {
        this.setState({
            startDate: e
        })
    }

    handleEndDateChange = (e) => {
        this.setState({
            endDate: e
        })
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        let date1 = new Date(this.state.startDate);
        let mnth1 = ("0" + (date1.getMonth() + 1)).slice(-2);
        let day1 = ("0" + date1.getDate()).slice(-2);
        let final1 = date1.getFullYear() + '-' + mnth1 + '-' + day1;

        let date = new Date(this.state.endDate)
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2)
        let day = ("0" + date.getDate()).slice(-2)
        let final = date.getFullYear() + '-' + mnth + '-' + day;

        await this.props.getMoneyEarned(final1, final);
    }

    renderGraphMonthlyReport = () => {
        return (
            <XYPlot
                name="monthlyGraph"
                width={1000}
                height={300}
                xType="ordinal">
                <VerticalBarSeries 
                data={this.props.clinicAdmin.monthlyReport}/>
                <XAxis/>
                <YAxis/>
            </XYPlot>
        )
    }

    renderGraphWeeklyReport = () => {
        return (
            <XYPlot
                width={1000}
                height={300}
                xType="ordinal">
                <VerticalBarSeries
                title = 'Appointments done weekly'
                data={this.props.clinicAdmin.weeklyReport}/>
                <XAxis/>
                <YAxis/>
            </XYPlot>
        )
    }

    renderDoctorsAndRatings(){
        let doctors = this.props.clinicAdmin.clinicDoctors;

        return _.map(doctors, doctor => {
            return(
              <tr key={doctor.user.id}>
                <td>
                    {doctor.user.name} {doctor.user.last_name}
                </td>
                <td>
                    {this.renderRating(doctor.user.id)}
                </td>
              </tr>
            )
          })
    }

    renderRating(id){
        for(let i = 0; i < this.props.clinicAdmin.doctorsRatings.length; i++){
            if(id === this.props.clinicAdmin.doctorsRatings[i].id){
                return(
                    <span>{this.props.clinicAdmin.doctorsRatings[i].rating}</span>
                )
            }
        }
    }

    renderMoney(){
        return(
        <span style={{fontSize: '14px'}}>Your clinic has earned {this.props.clinicAdmin.earnedMoney} in that period</span>
        )
    }

    render() {
        return (
            <div className="container">
                <h3 className="font-weight-bold text-center dark-grey-text pb-2">Your clinic has a rating of { this.props.clinicAdmin === null? '' : this.props.clinicAdmin.clinicRatingAvg}</h3>
                <div className="col col-lg-8 col-sm-12">
                    <label htmlFor="monthlyGraph"><span style={{fontSize: '20px'}}>Appointments done monthly in the last year</span></label>
                    {this.props.clinicAdmin === null ? '' : this.renderGraphMonthlyReport()}
                </div>
                <div className="col col-lg-8 col-sm-12">
                    <label htmlFor="weeklyGraph"><span style={{fontSize: '20px'}}>Appointments done weekly in the last 10 weeks</span></label>
                    {this.props.clinicAdmin === null ? '' : this.renderGraphWeeklyReport()}
                </div>  
                <div className="row">
                    <div className="col col-lg-5 col-sm-12">
                        <label htmlFor="weeklyGraph"><span style={{fontSize: '20px'}}>Appointments done weekly in the last 10 weeks</span></label>
                        <MDBTable>
                            <MDBTableHead>
                            <tr>
                                <th>Doctor</th>
                                <th>Rating</th>
                            </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.props.clinicAdmin === null ? '' : this.renderDoctorsAndRatings()}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    <div className="col col-lg-4 col-sm-12">
                        <div className="row">
                            {this.props.clinicAdmin === null ? '' : this.renderMoney()}
                        </div>
                        <div className="row">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="yyyy/MM/dd"
                                value={this.state.startDate}
                                onChange={e => this.handleStartDateChange(e)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog2"
                                label="Date picker dialog"
                                format="yyyy/MM/dd"
                                value={this.state.endDate}
                                onChange={e => this.handleEndDateChange(e)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        </div>
                        <div className="row" style={{marginLeft:'100px'}}>
                            <MDBBtn color="primary" onClick={(e) => this.handleSubmit(e)}>Submit</MDBBtn>
                        </div>
                    </div>
                </div>       
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        clinicAdmin: state.clinicAdmin
    }
};

export default connect(mapStateToProps, {getClinicDoctors, clinicAverageRating, getDoctorsAverageRating, getMoneyEarned, getMonthlyReport, getWeeklyReport})(BusinessInformation);