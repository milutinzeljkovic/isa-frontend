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

    rateClinic(clinic,stars){
        return this.getApiClient().post(`/reactions/${clinic}?stars_count=${stars}&clinic_id=${clinic}`);
    }

    rateDoctor(doctor,stars){
        return this.getApiClient().post(`/reactions/doctor/${doctor}?stars_count=${stars}`);
    }
    
}


export default ClinicService;



