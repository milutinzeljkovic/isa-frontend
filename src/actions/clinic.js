import { ServiceFactory } from '../services/ServiceFactory';
const clinicService = ServiceFactory.get('clinic');


export const addClinic = (clinic) =>{    

    console.log(clinicService);
    
    return async dispatch => {
        let response;
        response = await clinicService.add(clinic);
        return dispatch({ type: 'CLINIC_ADDED', payload: response.data });
    
    }
}


