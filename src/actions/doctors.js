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