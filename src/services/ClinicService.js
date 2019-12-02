import Service from './Service';

const resource = '/clinics';

class ClinicService extends Service{

    add(clinic) {        
        return this.getApiClient().post(`${resource}`,clinic);
    }
    search(params) {
        return this.getApiClient().get(`${resource}`);
    }

    fetchDoctors(clinic){
        return this.getApiClient().get(`${resource}/doctors/${clinic.id}`);
    }

    
}


export default ClinicService;



