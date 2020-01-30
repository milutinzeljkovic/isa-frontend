import { ServiceFactory } from '../services/ServiceFactory';
const appointmentService = ServiceFactory.get('appointments');


export const defineAppointment = data => {
    return async dispatch => {
        try{
           let res =  await appointmentService.addAppointment(data);
           return res;
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
            if(e.response.status === 400)
            {
                return e.response
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

export const requestAppointment = appointment => {
    return async dispatch => {
        try{
            const response = await appointmentService.requestAppointment(appointment);
            return dispatch({type: 'APPOINTMENT_REQUESTED', payload: response.data})
        }catch(e){
            return dispatch({type: 'APPOINTMENT_REQUESTED', payload: 'error'})
        }
    }
}

export const searchAppointment = params=> {    
    let terms = [];
    if(params !== undefined && params.type !== null){
        const c = {
            name: 'type',
            value: params.type.id
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

    return async dispatch => {
        let response;
        response = await appointmentService.searchAppointments(terms);        
        return dispatch({ type: 'FETCH_APPOINTMENTS', payload: response.data });
        
    }
}

