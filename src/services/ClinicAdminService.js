import Service from './Service';

const resource = '/auth';

class ClinicAdminService extends Service{

    registerMedStaff(medStaff) {
        return this.getApiClient().post(`${resource}/register/staff`, medStaff);
    }
}


export default ClinicAdminService;