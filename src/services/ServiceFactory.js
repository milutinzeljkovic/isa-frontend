import UsersService from './UserService';
import PatientService from './PatientService';
import ClinicAdminService from './ClinicAdminService';

import LocationService from './LocationService';
import ClinicService from './ClinicService';
const clinicAdminService = new ClinicAdminService();
const usersService = new UsersService();
const patientService = new PatientService();
const locationService = new LocationService();
const clinicService = new ClinicService();

const services = {
    users: usersService,
    patients: patientService,
    clinicAdmin: clinicAdminService,
    location: locationService,
    clinic: clinicService
};

export const ServiceFactory = {
    get: name => services[name]
};