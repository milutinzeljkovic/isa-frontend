import { ServiceFactory } from '../services/ServiceFactory';
const appointmentService = ServiceFactory.get('appointments');


export const defineAppointment = data => {
    return async dispatch => {
        try{
            await appointmentService.addAppointment(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }
        
    }
}