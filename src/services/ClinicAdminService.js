import Service from './Service';

const resource = '/clinicAdmin';

class ClinicAdminService extends Service{

    registerMedStaff(medStaff) {
        return this.getApiClient().post(`/auth/register/staff`, medStaff);
    }

    getAllDoctors(){
        return this.getApiClient().get(`${resource}/doctors`);
    }
}


export default ClinicAdminService;