import Service from './Service';

const resource = '/clinic-admin';

class ClinicAdminService extends Service{

    registerMedStaff(medStaff) {
        return this.getApiClient().post(`/auth/register/staff`, medStaff);
    }

    editOperation(data) {
        return this.getApiClient().post(`${resource}/edit-operations`, data);
    }

    getAllDoctors(){
        return this.getApiClient().get(`${resource}/doctors`);
    }

    getClinicDoctors(){
        return this.getApiClient().get(`${resource}/doctors/clinic`);
    }

    getClinicAdminClinic(){
        return this.getApiClient().get(`${resource}/clinic`);
    }

    updateClinic(data){
        return this.getApiClient().put(`${resource}/clinic/update`, data);
    }

    updateDoctor(data){
        return this.getApiClient().put(`/doctors/update/${data.id}`, data);
    }

    deleteDoctor(id){
        return this.getApiClient().delete(`/doctors/delete/${id}`);
    }

    getOperations(){
        return this.getApiClient().get(`${resource}/operations`);
    }

    seeIfBooked(id){
        return this.getApiClient().get(`/doctors/booked/${id}`);
    }
    getRequests(){
        return this.getApiClient().get(`${resource}/pending-appointment-requests`);
    }

    reserveAppointment(operations_room_id,appointment_id){
        return this.getApiClient().post(`${resource}/reserve-appointment?operations_room_id=${operations_room_id}&appointment_id=${appointment_id}`);
    }
}


export default ClinicAdminService;