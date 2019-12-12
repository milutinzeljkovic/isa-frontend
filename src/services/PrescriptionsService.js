import Service from './Service';

const resource = '/prescriptions';

class PrescriptionsService extends Service{

    getPrescriptions() {
        return this.getApiClient().get(`${resource}`);
    }

    checkPrescriptions(id) {
        return this.getApiClient().put(`${resource}/check/${id}`)
    }

}


export default PrescriptionsService;