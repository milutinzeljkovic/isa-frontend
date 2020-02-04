import Service from './Service';

const resource = '/vacation';

class VacationService extends Service{

    getVacationRequests() {
        return this.getApiClient().get(`${resource}`);
    }

    approveVacationRequest(id) {
        return this.getApiClient().put(`${resource}/approve/${id}`);
    }

    declineVacationRequest(id,message) {
        return this.getApiClient().put(`${resource}/decline/${id}?msg=${message}`);
    }

}


export default VacationService;