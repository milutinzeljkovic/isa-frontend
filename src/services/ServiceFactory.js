import UsersService from './UserService';
import PatientService from './PatientService';
import ClinicAdminService from './ClinicAdminService';
import DiagnoseService from './DiagnoseService';
import LocationService from './LocationService';
import ClinicService from './ClinicService';
import MedicineService from './MedicineService';
import PrescriptionsService from './PrescriptionsService';

const medicineService = new MedicineService();
const diagnoseService = new DiagnoseService();
const clinicAdminService = new ClinicAdminService();
const usersService = new UsersService();
const patientService = new PatientService();
const locationService = new LocationService();
const clinicService = new ClinicService();
const prescriptionsService = new PrescriptionsService();

const services = {
    users: usersService,
    patients: patientService,
    clinicAdmin: clinicAdminService,
    location: locationService,
    clinic: clinicService,
    diagnose: diagnoseService,
    medicine: medicineService,
    prescriptions: prescriptionsService
};

export const ServiceFactory = {
    get: name => services[name]
};