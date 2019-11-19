import UsersService from './UserService';
import PatientService from './PatientService';


const usersService = new UsersService();
const patientService = new PatientService();

const services = {
    users: usersService,
    patients: patientService
};

export const ServiceFactory = {
    get: name => services[name]
};