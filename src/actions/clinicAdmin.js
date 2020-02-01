import { ServiceFactory } from '../services/ServiceFactory';
const clinicAdminService = ServiceFactory.get('clinicAdmin');

export const registerMedStaff = data => {
    return async dispatch => {
        let response;
        try{
            response = await clinicAdminService.registerMedStaff(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR_MAIL_EXISTS', payload: 'Failed to sign up' })
            }
        }
        
        if(!response){
            dispatch({ type: 'ERROR', payload: 'Failed to add medical staff' });
        }
        if (response.status === 200) {
            dispatch({ type: 'REGISTERMEDSTAFF' });
        } 
    }
}

export const getAllDoctors = () => {
    return async dispatch => {
        let response;
        try{
            response = await clinicAdminService.getAllDoctors();
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'FETCHING_DOCTORS_ERROR', payload: 'Fetching all doctors failed' })
            }
        }

        if(!response){
            return dispatch({ type: 'FETCHING_DOCTORS_ERROR', payload: 'Fetching all doctors failed' })
        }

        if (response.status === 200) {
            dispatch({ type: 'GETALLDOCTORS', payload: response.data });
        }
    }
}

export const getClinicAdminClinic = () => {
    return async dispatch => {
        let response;
        response = await clinicAdminService.getClinicAdminClinic();
        return dispatch({type: 'FETCH_CLINIC_ADMIN_CLINIC', payload: response.data})
    }
}

export const updateClinic = (data) => {
    return async dispatch => {
        try{
            await clinicAdminService.updateClinic(data);
        }catch(e){
            if(e.response.status === 500){
                dispatch({ type: 'ERROR', payload: 'error'});
            }
        }
    }
}

export const setEntityToBeUpdated = (data) => {
    return dispatch => {
        dispatch({ type: 'ENTITY_TO_BE_UPDATED', payload: data});
    }
}

export const seeIfBookedDoctor = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await clinicAdminService.seeIfBooked(id);
        }catch(e){
            if(e.response.status === 500){
                dispatch({ type: 'ERROR', payload: 'error'});
            }
        }

        if(response.status === 200){
            dispatch({type: 'SET-UPDATABLE', payload: response.data});
        }
    }
}

export const deleteDoctor = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await clinicAdminService.deleteDoctor(id);
        }catch(e){
            if(e.response.status === 500){
                dispatch({ type: 'ERROR', payload: 'error'});
            }
        }

        if(response.status === 200){
            dispatch({type: 'DELETE-DOCTOR', payload: response.data});
        }
    }
}

export const updateDoctor = (doctor) => {
    return async dispatch => {
        try{
            await clinicAdminService.updateDoctor(doctor);
        }catch(e){
            if(e.response.status === 500){
                dispatch({ type: 'ERROR', payload: 'error'});
            }
        }
    }
}

export const getClinicDoctors = () => {
    return async dispatch => {
        let response;
        try{
            response = await clinicAdminService.getClinicDoctors();
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'FETCHING_DOCTORS_ERROR', payload: 'Fetching all doctors failed' })
            }
        }
        if(!response){
            return dispatch({ type: 'FETCHING_DOCTORS_ERROR', payload: 'Fetching all doctors failed' })
        }

        if (response.status === 200) {
            dispatch({ type: 'CLINIC_DOCTORS', payload: response.data });
        }
    }
}