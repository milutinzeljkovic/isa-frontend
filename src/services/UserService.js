import Service from './Service';

const resource = '/auth';

class UsersService extends Service{
    login(user) {
        return this.getApiClient().post(`${resource}/login`, user);
    }

    register(user) {
        return this.getApiClient().post(`${resource}/register`, user);
    }

    fetchCurrentUser() {
        return this.getApiClient().post(`${resource}/me`);
    }

    logoutUser() {
        return this.getApiClient().post(`${resource}/logout`);
    }
}


export default UsersService;