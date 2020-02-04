import React, { Component } from 'react';
import { MDBBtn} from 'mdbreact';
import { MDBTable, MDBTableBody, MDBTableHead, MDBContainer } from 'mdbreact';
import _ from 'loadsh';
import  DeclineVacationForm  from '../DeclineVacationForm';
import { getVacationRequests, approveVacationRequest} from '../../actions/vacation';
import { connect } from 'react-redux';

class ConfirmDenyVacation extends Component {

    constructor(props){
        super(props);
        this.state = {
            showDeclineModal: false,
            id: ''
        }
    }

    async componentDidMount(){
        await this.props.getVacationRequests();
    }

    confirmVacation = (id) => {
      this.props.approveVacationRequest(id);
    }

    toggleDeclineModal = () => {
      this.setState({
        showDeclineModal: !this.state.showDeclineModal
      });
    }

    declineVacation = (id) => {
      this.setState({
        id: id,
        showDeclineModal: !this.state.showDeclineModal
      });
    }

    renderList(vacations){ 

        return _.map(vacations, vacation => {
          return(
            <tr key={vacation.id}>
                <td>{vacation.name}</td>
                <td>{vacation.last_name}</td>
                <td>{vacation.role}</td>
                <td>{vacation.from}</td>
                <td>{vacation.to}</td>
                <td>
                  <MDBBtn color="primary" onClick = {() => this.confirmVacation(vacation.id)}>Confirm</MDBBtn>
                </td>
                <td>
                  <MDBBtn color="success" onClick = {() => this.declineVacation(vacation.id)}>Decline</MDBBtn>
                </td>
            </tr>
          )
        })
    
      }
    
    render(){
        return (
          <div>
              <MDBContainer>
                <p><span style={{fontSize: '30px'}}>All vacation requests in your clinic</span></p>
                <MDBTable hover>
                <MDBTableHead color="info-color" textWhite>
                    <tr>
                    <th>Name</th>
                    <th>Last name</th>
                    <th>Role</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Accept</th>
                    <th>Decline</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    { this.vacations === null ? '' : this.renderList(this.props.vacations)}
                </MDBTableBody>
                </MDBTable>
                <DeclineVacationForm id={this.state.id} show={this.state.showDeclineModal} toggle={this.toggleDeclineModal} />
              </MDBContainer>
          </div>
        );
    
      }
}

const mapStateToProps = state => {
    return{
        vacations: state.vacations === null ? null : state.vacations.vacationRequestList,
    }
};

export default connect(mapStateToProps, {getVacationRequests, approveVacationRequest})(ConfirmDenyVacation);