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

export const reserveAppointment = id => {
    return async dispatch => {
        try{
            const response = await appointmentService.reserveAppointmen(id);
            return dispatch({ type: 'APPOINTMENT_RESERVED', payload: response.data})
        }catch(e){

        }
    }
}

export const appointmentHistory = id => {
    return async dispatch => {
        try{
            const response = await appointmentService.appointmentHistory(id);
            return dispatch({ type: 'APPOINTMENT_HISTORY', payload: response.data})
        }catch(e){

        }
    }
}