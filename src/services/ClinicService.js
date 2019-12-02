import Service from './Service';

const resource = '/clinics';

class ClinicService extends Service{

    test(){
        console.log('test');
        
    }

    add(clinic) {
        console.log('dodavanje');
        
        return this.getApiClient().post(`${resource}`,clinic);
    }

    
}


export default ClinicService;



