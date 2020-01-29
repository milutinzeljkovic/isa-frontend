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
    requestAppointment(appointment) {
        return this.getApiClient().post(`${resource}/request/${appointment.doctorId}?date=${appointment.date}&appointment_type=${appointment.appointment_type}`);
    }
    
    searchAppointments(terms) {
        console.log(terms);
        
        let queryParams = '';
        if(terms !== undefined){
            queryParams += '?';
            terms.forEach(term => {
                if(term.value !== null){
                    queryParams += term.name;
                    queryParams += '=';
                    queryParams += term.value;
                    queryParams += '&';
                }
            });
        }
        
        return this.getApiClient().get(`${resource}${queryParams}`);
    }
}


export default AppointmentService;