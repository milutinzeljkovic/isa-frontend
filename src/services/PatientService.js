import Service from './Service';

const resource = '/patients';

class PatientService extends Service{

    getPatients() {
        return this.getApiClient().get(`${resource}`);
    }

    getPatientsByClinic() {
        return this.getApiClient().get(`${resource}/clinic`);
    }


    acceptRegistration(id) {
        return this.getApiClient().get(`${resource}/accept/${id}`)
    }

    declineRegistration(id, message) {
        return this.getApiClient().get(`${resource}/decline/${id}?msg=${message}`)
    }

    update(data){
        return this.getApiClient().put(`${resource}/${data.id}`,data);
    }

    searchPatients(data){
        return this.getApiClient().post(`${resource}/search`, data);
    }

    getPatient(id){
        return this.getApiClient().get(`${resource}/show/${id}`);
    }

    getMedicalRecord(id){
        return this.getApiClient().get(`${resource}/medical-record/${id}`);
    }

    getPatientAppointments(id){
        return this.getApiClient().get(`${resource}/appointments/${id}`);
    }
}


export default PatientService;