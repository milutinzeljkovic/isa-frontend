import Service from './Service';

const resource = '/working-hours';

class WorkingHoursService extends Service{

    getDoctorsWorkingHours(id){
        return this.getApiClient().get(`${resource}/doctors/${id}`);
    }

    updateDoctorsWorkingDay(data,id){
        return this.getApiClient().put(`${resource}/update-doctors/${id}`, data);
    }
}


export default WorkingHoursService;
    