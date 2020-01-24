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

    if(params !== undefined && params.date !== undefined){
        const c = {
            name: 'date',
            value: params.date
        }
        terms.push(c);
    }

    if(params !== undefined && params.appointment_type !== undefined){
        const c = {
            name: 'appointment_type',
            value: params.appointment_type
        }
        terms.push(c);
    }

    if(params !== undefined && params.stars !== undefined){
        const c = {
            name: 'stars',
            value: params.stars
        }
        terms.push(c);
    }
    if(params !== undefined && params.address !== undefined){
        const c = {
            name: 'address',
            value: params.address
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

export const showClinic = id => {
    return async dispatch => {
        let response = await clinicService.showClinic(id);
        return dispatch({type: 'CLINIC_FETCHED', payload: response.data});
    }
}

export const clinicDetails = (show) => {    
    return { type: 'CLINIC_DETAILS', payload: show };
}

export const searchDoctors = (params) => {        
    let terms = [];

    if(params !== undefined && params.clinic_id !== undefined){
        const c = {
            name: 'clinic_id',
            value: params.clinic_id
        }
        terms.push(c);
    }

    if(params !== undefined && params.name !== undefined){
        const c = {
            name: 'name',
            value: params.name
        }
        terms.push(c);
    }



    if(params !== undefined && params.date !== undefined){
        const c = {
            name: 'date',
            value: params.date
        }
        terms.push(c);
    }

    if(params !== undefined && params.appointment_type !== undefined){
        const c = {
            name: 'appointment_type',
            value: params.appointment_type
        }
        terms.push(c);
    }

    if(params !== undefined && params.stars !== undefined){
        const c = {
            name: 'stars',
            value: params.stars
        }
        terms.push(c);
    }

    

    return async dispatch => {
        let response;
        response = await clinicService.searchDoctors(terms);        
        return dispatch({ type: 'DOCTORS_SEARCH', payload: response.data });
        
    }
}