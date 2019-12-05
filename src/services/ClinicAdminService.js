import Service from './Service';

const resource = '/auth';

class ClinicAdminService extends Service{

    registerMedStaff(medStaff) {
        return this.getApiClient().post(`${resource}/register/staff`, medStaff);
    }

    getAllDoctors(){
        return this.getApiClient().get(`/clinicAdmin/doctors`);
    }
}


export default ClinicAdminService;