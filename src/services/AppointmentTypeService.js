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

    deleteAppointmentTypes(id){
        return this.getApiClient().delete(`${resource}/delete/${id}`);
    }

    updateAppointmentType(data){
        return this.getApiClient().put(`${resource}/update/${data.id}`, data);
    }

    seeIfUsed(id){
        return this.getApiClient().get(`${resource}/used/${id}`);
    }
}


export default AppointmentTypeService;