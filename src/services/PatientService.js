import Service from './Service';

const resource = '/patients';

class PatientService extends Service{

    getPatients() {
        return this.getApiClient().get(`${resource}`);
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

}


export default PatientService;