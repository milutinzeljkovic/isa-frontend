import React, { Component } from 'react';
import { MDBListGroupItem, MDBBadge } from "mdbreact";
import _ from 'loadsh';

class MedicalRecord extends Component {

    constructor(props){
        super(props);
        console.log(this.props.record);
        
    }

    renderMedicalDatas = datas => {
        return _.map(datas, data => {            
            return(
                <tbody>
                <tr>
                   <td><h5 className="mb-1">{data.name}</h5></td>
                   <td><h5 className="mb-1">{data.medical_data_medical_record.value} {data.unit}</h5></td>
                </tr>
                </tbody>                    
            )
        })
    }

    renderPrescriptions = datas => {
        return _.map(datas, data => {            
            return(
                <div>
                <tr>
                    <td><h5 className="mb-1">presctiption: {data.info} {data.medicine.name}</h5></td>
                </tr>
                <tr>
                    <td><h5 className="mb-1">approved by: {data.nurse.user.name} {data.nurse.user.email}</h5></td>
                </tr>
                </div>
                    
            )
        })
    }

    renderMedicalReports = datas => {
        return _.map(datas, data => {            
            return(
                <table>
                <tbody>
                    <tr>
                       <td><h5 className='mb-1'>report by: {data.doctor.user.name} {data.doctor.user.email}</h5></td>
                    </tr>
                    <tr>
                       <td><h5 className="mb-1">name: {data.diagnose.name}</h5></td>
                    </tr>
                    <tr>
                       <td><h5 className="mb-1">description: {data.diagnose.description}</h5></td>
                    </tr>
                    <tr>
                       <td><h5 className="mb-1">diagnose date: {data.diagnose.created_at}</h5></td>
                    </tr>
                    {this.renderPrescriptions(data.prescriptions)}
                </tbody>
                </table>

            )
        })
    }
    render() {
        return (
            <div>
                <MDBListGroupItem key = {1}>
                    <MDBBadge  tag="a" color="teal">Medical datas</MDBBadge>

                    <table>
                            {this.renderMedicalDatas(this.props.medicalRecord.medical_datas)}
                    </table>
                </MDBListGroupItem>
                <MDBListGroupItem key = {2}>

                <MDBBadge  tag="a" color="teal">Medical reports</MDBBadge>
                    {this.renderMedicalReports(this.props.medicalRecord.medical_reports)}
                </MDBListGroupItem>
            </div>
        );
    }
}

export default MedicalRecord;