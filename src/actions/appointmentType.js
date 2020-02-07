import { ServiceFactory } from '../services/ServiceFactory';
const appointmentTypeService = ServiceFactory.get('appointmentType');


export const newAppointmentType = data => {
    return async dispatch => {
        try{
            await appointmentTypeService.addAppointmentType(data);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
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
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }

        if(response){
            if(response.status === 200){
                return dispatch({ type: 'GETALLAPPTYPES', payload: response.data })
            }
        }
    }
}

export const deleteAppointmentType = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await appointmentTypeService.deleteAppointmentTypes(id);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }

        if(response.status === 200){
            return dispatch({ type: 'DELETE_APPOINTMENT_TYPE', payload: response.data })
        } 
    }
}

export const seeIfUsedAppType = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await appointmentTypeService.seeIfUsed(id);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    dispatch({ type: 'ERROR', payload: 'error'});
                }
            }
        }

        if(response.status === 200){
            dispatch({type: 'SET-UPDATABLE', payload: response.data});
        }
    }
}

export const updateAppType = (data) => {
    return async dispatch => {
        try{
            await appointmentTypeService.updateAppointmentType(data);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        } 
    }
}

export const getAppointmentTypesClinic = () => {
    return async dispatch => {
        let response;
        try{
            response = await appointmentTypeService.getAppointmentTypesClinic();
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }
        if(response){
            if(response.status === 200){
                return dispatch({ type: 'APPOINTMENT_TYPES_CLINIC', payload: response.data })
            }
        }
        
    }
}

export const getDoctorsOptionsAppTypes = (data) => {
    return async dispatch => {
        let response;
        try{
            response = await appointmentTypeService.getDoctorsOptionsAppTypes(data);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        } 
        
        if(response.status === 200){
            return dispatch({ type: 'DOCTORS-OPTIONS-APP-TYPE', payload: response.data })
        }
    }
}

