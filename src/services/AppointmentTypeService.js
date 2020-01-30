import Service from './Service';

const resource = '/appointment-types';

class AppointmentTypeService extends Service{

    addAppointmentType(appType) {
        return this.getApiClient().post(`${resource}/`, appType);
    }

    getAppointmentTypes(){
        return this.getApiClient().get(`${resource}/`);
    }

    getAppointmentTypesClinic(){
        return this.getApiClient().get(`${resource}/clinic`);
    }
}


export default AppointmentTypeService;