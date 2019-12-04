import { ServiceFactory } from '../services/ServiceFactory';
const diagnoseService = ServiceFactory.get('diagnose');


export const addDiagnose = data => {
    return async dispatch => {
        try{
            await diagnoseService.addDiagnose(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }
        
    }
}

