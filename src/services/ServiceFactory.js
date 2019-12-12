import UsersService from './UserService';
import PatientService from './PatientService';
import ClinicAdminService from './ClinicAdminService';
import DiagnoseService from './DiagnoseService';
import LocationService from './LocationService';
import ClinicService from './ClinicService';
import MedicineService from './MedicineService';
import OperatingRoomService from './OperatingRoomService';
import AppointmentTypeService from './AppointmentTypeService';
import AppointmentService from './AppointmentService';

const medicineService = new MedicineService();
const diagnoseService = new DiagnoseService();
const clinicAdminService = new ClinicAdminService();
const usersService = new UsersService();
const patientService = new PatientService();
const locationService = new LocationService();
const clinicService = new ClinicService();
const operatingRoomService = new OperatingRoomService();
const appointmentTypeService = new AppointmentTypeService();
const appointmentService = new AppointmentService();

const services = {
    users: usersService,
    patients: patientService,
    clinicAdmin: clinicAdminService,
    location: locationService,
    clinic: clinicService,
    diagnose: diagnoseService,
    medicine: medicineService,
    operatingRoom: operatingRoomService,
    appointmentType: appointmentTypeService,
    appointments: appointmentService
};

export const ServiceFactory = {
    get: name => services[name]
};