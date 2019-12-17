import Service from './Service';

const resource = '/clinics';

class ClinicService extends Service{

    add(clinic) {        
        return this.getApiClient().post(`${resource}`,clinic);
    }

    search(terms) {
        let queryParams = '';
        if(terms !== undefined){
            terms.forEach(term => {
                queryParams += '?';
                queryParams += term.name;
                queryParams += '=';
                queryParams += term.value;
                queryParams += '&';
            });
        }
        
        return this.getApiClient().get(`${resource}${queryParams}`);
    }

    fetchDoctors(clinic){
        return this.getApiClient().get(`${resource}/doctors/${clinic.id}`);
    }

    //localhost:8000/api/reactions/1?clinic_id=1&stars_count=4.5
    rateClinic(clinic,stars){
        return this.getApiClient().post(`/reactions/${clinic}?stars_count=${stars}&clinic_id=${clinic}`);
    }

    
}


export default ClinicService;



