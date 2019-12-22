import Service from './Service';

const resource = '/appointment';

class AppointmentService extends Service{

    addAppointment(appointment) {
        return this.getApiClient().post(`${resource}/add`, appointment);
    }
    reserveAppointmen(id) {
        return this.getApiClient().post(`${resource}/reserve/${id}`);
    }
    
    appointmentHistory(id) {
        return this.getApiClient().get(`${resource}/history/${id}`);
    }
}


export default AppointmentService;