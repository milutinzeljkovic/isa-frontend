import UsersService from './UserService';
import PatientService from './PatientService';
import LocationService from './LocationService';
import ClinicService from './ClinicService';

const usersService = new UsersService();
const patientService = new PatientService();
const locationService = new LocationService();
const clinicService = new ClinicService();

const services = {
    users: usersService,
    patients: patientService,
    location: locationService,
    clinic: clinicService
};

export const ServiceFactory = {
    get: name => services[name]
};