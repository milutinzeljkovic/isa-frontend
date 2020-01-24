import Service from './Service';

const resource = '/doctors';

class DoctorService extends Service{

    fetchDoctor(id) {
        return this.getApiClient().get(`${resource}/appointments/${id}`);
    }

    getAppointment(){
        return this.getApiClient().get(`${resource}/calendar`);

    }

    finishReport(data){
        return this.getApiClient().post(`${resource}/finish-report`,data);

    }

  
}


export default DoctorService;