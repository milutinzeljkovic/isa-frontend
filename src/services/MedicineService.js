import Service from './Service';

const resource = '/medicine';

class MedicineService extends Service{

    addMedicine(medicine) {
        return this.getApiClient().post(`${resource}/add`, medicine);
    }

  
}


export default MedicineService;