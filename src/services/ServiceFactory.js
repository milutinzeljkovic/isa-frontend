import UsersService from './UserService';
import PatientService from './PatientService';
import LocationService from './LocationService';


const usersService = new UsersService();
const patientService = new PatientService();
const locationService = new LocationService();

const services = {
    users: usersService,
    patients: patientService,
    location: locationService
};

export const ServiceFactory = {
    get: name => services[name]
};