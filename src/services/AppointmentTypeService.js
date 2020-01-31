import Service from './Service';

const resource1 = '/appointmentType';

class AppointmentTypeService extends Service{

    addAppointmentType(appType) {
        return this.getApiClient().post(`${resource1}/add`, appType);
    }

    getAppointmentTypes(){
        return this.getApiClient().get(`${resource1}/get`);
    }

    deleteAppointmentTypes(id){
        return this.getApiClient().delete(`${resource1}/delete/${id}`);
    }

    updateAppointmentType(data){
        return this.getApiClient().put(`${resource1}/update/${data.id}`, data);
    }

    seeIfUsed(id){
        return this.getApiClient().get(`${resource1}/used/${id}`);
    }
}


export default AppointmentTypeService;