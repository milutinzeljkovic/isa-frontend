import Service from './Service';

const resource = '/appointment';

class AppointmentService extends Service{

    addAppointment(appointment) {
        return this.getApiClient().post(`${resource}/add`, appointment);
    }
}


export default AppointmentService;