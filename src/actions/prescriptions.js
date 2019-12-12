import { ServiceFactory } from '../services/ServiceFactory';
const prescriptionsService = ServiceFactory.get('prescriptions');


export const fetchPrescriptions = () =>{

    return async dispatch => {
        let response;
        response = await prescriptionsService.getPrescriptions();
        return dispatch({ type: 'FETCH_PRESCRIPTIONS', payload: response.data });
    
    }
  
}


export const checkPrescriptions =  id  => {

    return async dispatch => {
        await prescriptionsService.checkPrescriptions(id);
        return dispatch({ type: 'CHECK_PRESCRIPTIONS', payload: id });

    }
}