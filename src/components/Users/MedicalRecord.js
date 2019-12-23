import React, { Component } from 'react';
import { MDBCard, MDBListGroup, MDBListGroupItem, MDBBadge } from "mdbreact";
import _ from 'loadsh';

class MedicalRecord extends Component {

    constructor(props){
        super(props);
        console.log(this.props.record);
        
    }

    renderMedicalDatas = datas => {
        return _.map(datas, data => {            
            return(
                <MDBListGroupItem 
                    key = {data.id}
                >  
                    <p className="mb-1">{data.name}</p>
                    <p className="mb-1">{data.medical_data_medical_record.value} {data.unit}</p>
                    
                </MDBListGroupItem>
            )
        })
    }

    renderPrescriptions = datas => {
        return _.map(datas, data => {            
            return(
                <MDBListGroupItem 
                    key = {data.id}
                >  
                    <p className="mb-1">presctiption: {data.info} {data.medicine.name}</p>
                    <p className="mb-1">approved by: {data.nurse.user.name} {data.nurse.user.email}</p>
                    
                    
                </MDBListGroupItem>
            )
        })
    }

    renderMedicalReports = datas => {
        return _.map(datas, data => {            
            return(
                <MDBListGroupItem 
                    key = {data.id}
                >  
                    <h5 className='mb-1'>report by: {data.doctor.user.name} {data.doctor.user.email}</h5>
                    <p className="mb-1">name: {data.diagnose.name}</p>
                    <p className="mb-1">description: {data.diagnose.description}</p>
                    <p className="mb-1">diagnose date: {data.diagnose.created_at}</p>
                    {this.renderPrescriptions(data.prescriptions.all)}
                </MDBListGroupItem>
            )
        })
    }
    render() {
        return (
            <MDBListGroupItem>
                <p>Medical record</p>
                {this.renderMedicalDatas(this.props.medicalRecord.medicalDatas.all)}
                <p>Medical reports</p>
                {this.renderMedicalReports(this.props.medicalRecord.medicalReports.all)}
            </MDBListGroupItem>
        );
    }
}

export default MedicalRecord;