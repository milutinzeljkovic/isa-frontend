import Service from './Service';

const resource1 = '/appointmentType';

class AppointmentTypeService extends Service{

    addAppointmentType(appType) {
        return this.getApiClient().post(`${resource1}/add`, appType);
    }

    getAppointmentTypes(){
        return this.getApiClient().get(`${resource1}/get`);
    }
}


export default AppointmentTypeService;