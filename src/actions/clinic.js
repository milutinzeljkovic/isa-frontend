import { ServiceFactory } from '../services/ServiceFactory';
const clinicService = ServiceFactory.get('clinic');


export const addClinic = (clinic) =>{        
    return async dispatch => {
        let response;
        response = await clinicService.add(clinic);
        return dispatch({ type: 'CLINIC_ADDED', payload: response.data });
    
    }
}

export const searchClinics = (params) => {
    return async dispatch => {
        let response;
        response = await clinicService.search(params);
        return dispatch({ type: 'FETCH_CLINICS', payload: response.data });
        
    }
}

export const clinicClick = (clinic) => {    
    return { type: 'SELECTED_CLINIC', payload: clinic };
}

export const fetchDoctors = (clinic) => {
    return async dispatch => {
        let response;
        response = await clinicService.fetchDoctors(clinic);
        return dispatch({ type: 'FETCH_CLINIC_DOCTORS', payload: response.data });
        
    }
}