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