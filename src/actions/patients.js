import { ServiceFactory } from '../services/ServiceFactory';
const patientsService = ServiceFactory.get('patients');


export const fetchAll = () =>{

    return async dispatch => {
        let response;
        response = await patientsService.getPatients();
        return dispatch({ type: 'FETCH_PATIENTS', payload: response.data });
    
    }
  
}

export const fetchByClinic = () =>{

    return async dispatch => {
        let response;
        response = await patientsService.getPatientsByClinic();
        return dispatch({ type: 'FETCH_PATIENTS_BY_CLINIC', payload: response.data });
    
    }
  
}

export const acceptRegistration =  id  => {

    return async dispatch => {
        await patientsService.acceptRegistration(id);
        return dispatch({ type: 'ACCEPT_REGISTRATION', payload: id });

    }
}

export const declineRegistration =  (id, message)  => {

    return async dispatch => {
        
        await patientsService.declineRegistration(id, message);
        return dispatch({ type: 'DECLINE_REGISTRATION', payload: id });

    }
}

export const update = (data) => {
    return async dispatch => {
        let response = await patientsService.update(data);
        return dispatch({type: 'UPDATE_PROFILE',payload:response});
    }
}

export const searchPatients = (data) => {
    return async dispatch => {
        let response;
        try{
            response = await patientsService.searchPatients(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }

        if(response.status === 200){
            return dispatch({ type: 'SEARCHEDPATIENTS', payload: response.data })
        }
        
    }
}

