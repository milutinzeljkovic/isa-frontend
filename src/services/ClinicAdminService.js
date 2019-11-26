import Service from './Service';

const resource = '/auth';

class PatientService extends Service{

    registerMedStaff(medStaff) {
        return this.getApiClient().post(`${resource}/register/staff`, medStaff);
    }
}


export default PatientService;