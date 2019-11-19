import { ServiceFactory } from '../services/ServiceFactory';
const patientsService = ServiceFactory.get('patients');


export const fetchAll = () =>{

    return async dispatch => {
        let response;
        response = await patientsService.getPatients();
        return dispatch({ type: 'FETCH_PATIENTS', payload: response.data });
    
    }
  
}

export const acceptRegistration =  id  => {

    return async dispatch => {
        let response;
        response = await patientsService.acceptRegistration(id);
        return dispatch({ type: 'ACCEPT_REGISTRATION', payload: response.data });

    }
}

export const declineRegistration =  (id, message)  => {

    return async dispatch => {
        let response;
        response = await patientsService.declineRegistration(id, message);
        return dispatch({ type: 'DECLINE_REGISTRATION', payload: response.data });

    }
}

