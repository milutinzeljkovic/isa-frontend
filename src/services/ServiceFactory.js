import UsersService from './UserService';
import PatientService from './PatientService';
import ClinicAdminService from './ClinicAdminService';


const usersService = new UsersService();
const patientService = new PatientService();
const clinicAdminService = new ClinicAdminService();

const services = {
    users: usersService,
    patients: patientService,
    clinicAdmin: clinicAdminService
};

export const ServiceFactory = {
    get: name => services[name]
};