import { ServiceFactory } from '../services/ServiceFactory';
const doctorService = ServiceFactory.get('doctors');


export const fetchDoctor = (id) => {
    
    return async dispatch => {
        let response;
        response = await doctorService.fetchDoctor(id);
        return dispatch({ type: 'DOCTOR_FETCHED', payload: response.data });
    }
}

export const  filterDoctors = (filter) => {
    return {
        type: 'DOCTOR_FILTER',
        payload: filter
    }
}


export const getAppointment = () =>{

    return async dispatch => {
        let response;
        response = await doctorService.getAppointment();
        return dispatch({ type: 'FETCH_APPOINTMENT', payload: response.data });
    
    }
  
}

export const finishReport = (data) =>{

    return async dispatch => {
        await doctorService.finishReport(data);
    
    }
  
}