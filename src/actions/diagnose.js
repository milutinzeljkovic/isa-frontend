import { ServiceFactory } from '../services/ServiceFactory';
const diagnoseService = ServiceFactory.get('diagnose');


export const addDiagnose = data => {
    return async dispatch => {
        try{
            await diagnoseService.addDiagnose(data);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }
        
    }
}

export const getDiagnoses = () => {
    return async dispatch => {
        try{
            let response =await diagnoseService.getDiagnoses();
            return dispatch({ type: 'GET_DIAGNOSES', payload: response.data })
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }
        
    }
}

