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
    
    let terms = [];
    if(params !== undefined && params.name !== undefined){
        const c = {
            name: 'name',
            value: params.name
        }
        terms.push(c);
    }

    return async dispatch => {
        let response;
        response = await clinicService.search(terms);        
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

export const rateClinic = (clinic,stars) => {
    return async dispatch => {
        let response = await clinicService.rateClinic(clinic,stars);
        return dispatch({type: 'CLINIC_RATED', payload: response.data});
    }
}

export const rateDoctor = (doctor,stars) => {
    return async dispatch => {
        let response = await clinicService.rateDoctor(doctor,stars);
        return dispatch({type: 'DOCTOR_RATED', payload: response.data});
    }
}