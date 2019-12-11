import { ServiceFactory } from '../services/ServiceFactory';
const appointmentTypeService = ServiceFactory.get('appointmentType');


export const newAppointmentType = data => {
    return async dispatch => {
        try{
            await appointmentTypeService.addAppointmentType(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }
        
    }
}

export const getAppointmentTypes = () => {
    return async dispatch => {
        let response;
        try{
            response = await appointmentTypeService.getAppointmentTypes();
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }

        if(response.status === 200){
            return dispatch({ type: 'GETALLAPPTYPES', payload: response.data })
        }
        
    }
}

