import Service from './Service';

const resource = '/auth';

class UsersService extends Service{
    login(user) {
        return this.getApiClient().post(`${resource}/login`, user);
    }

    register(user) {
        return this.getApiClient().post(`${resource}/register`, user);
    }

    vacation(user) {
        return this.getApiClient().post(`${resource}/vacation`, user);
    }

    fetchCurrentUser() {
        return this.getApiClient().post(`${resource}/me`);
    }

    logoutUser() {
        return this.getApiClient().post(`${resource}/logout`);
    }
    refresh(){
        return this.getApiClient().post(`${resource}/refresh`);
    }

    registerClinicAdmin(user, clinic_id) {
        return this.getApiClient().post(`${resource}/register/clinic-admin/${clinic_id}`, user);
    }

    registerClinicalCenterAdmin(user) {
        return this.getApiClient().post(`${resource}/register/clinical-center-admin`, user);
    }

    changePassword(user) {
        return this.getApiClient().post(`${resource}/change-password`, user);
    }



}


export default UsersService;