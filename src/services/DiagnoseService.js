import Service from './Service';

const resource = '/diagnose';

class DiagnoseService extends Service{

    addDiagnose(diagnose) {
        return this.getApiClient().post(`${resource}/add`, diagnose);
    }

    getDiagnoses() {
        return this.getApiClient().get(`${resource}`);
    }
}


export default DiagnoseService;