import React, { Component } from 'react';
import { MDBListGroupItem, MDBBadge, MDBListGroup } from "mdbreact";
import _ from 'loadsh';

class MedicalRecord extends Component {


    renderMedicalDatas = datas => {        
        return _.map(datas, data => {            
            return(
                <tr key = {data.unit}>
                   <td><h5 className="mb-1">{data.name}</h5></td>
                   <td><h5 className="mb-1">{data.medical_data_medical_record.value} {data.unit}</h5></td>
                </tr>
            )
        })
    }

    renderPrescriptions = datas => {
        return _.map(datas, data => {            
            return(
                    <tbody key = {data.id}>
                    <tr>
                        <td><h5 className="mb-1">presctiption: {data.info} {data.medicine.name}</h5></td>
                    </tr>
                    <tr>
                        <td><h5 className="mb-1">approved by: {data.nurse.user.name} {data.nurse.user.email}</h5></td>
                    </tr>
                    </tbody>
                    
            )
        })
    }

    renderMedicalReports = datas => {
        return _.map(datas, data => {            
            return(
                <MDBListGroupItem key = {data.id}>
                <table>
                <tbody>
                    <tr>
                       <td><h5 className='mb-1'>report by:</h5></td><td><h5>{data.doctor.user.name} {data.doctor.user.email}</h5></td>
                    </tr>
                    <tr>
                       <td><h5 className='mb-1'>report made in:</h5></td><td><h5>{data.appointment.clinic.name}</h5></td>
                    </tr>
                    <tr>
                       <td><h5 className="mb-1">name:</h5></td><td><h5> {data.diagnose.name}</h5></td>
                    </tr>
                    <tr>
                       <td><h5 className="mb-1">description:</h5></td><td><h5> {data.diagnose.description}</h5></td>
                    </tr>
                    <tr>
                       <td><h5 className="mb-1">diagnose date:</h5></td><td><h5> {data.diagnose.created_at}</h5></td>
                    </tr>
                </tbody>
                </table>
                <table>
                {this.renderPrescriptions(data.prescriptions)}
                </table>
                </MDBListGroupItem>

            )
        })
    }
    render() {
        return (
            <div>
                <MDBListGroupItem key = {1}>
                    <MDBBadge  tag="a" color="teal">Medical datas</MDBBadge>

                    <table>
                        <tbody>
                            {this.renderMedicalDatas(this.props.medicalRecord.medical_datas)}
                        </tbody>
                    </table>
                </MDBListGroupItem>
                <MDBListGroupItem key = {2}>

                <MDBBadge  tag="a" color="teal">Medical reports</MDBBadge>
                <MDBListGroup>
                    {this.renderMedicalReports(this.props.medicalRecord.medical_reports)}
                </MDBListGroup>
                </MDBListGroupItem>
            </div>
        );
    }
}

export default MedicalRecord;