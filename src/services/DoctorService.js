import Service from './Service';

const resource = '/doctors';

class DoctorService extends Service{

    fetchDoctor(id) {
        return this.getApiClient().get(`${resource}/appointments/${id}`);
    }

  
}


export default DoctorService;