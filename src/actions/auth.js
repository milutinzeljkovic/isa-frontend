import { ServiceFactory } from '../services/ServiceFactory';
const usersService = ServiceFactory.get('users');

export const register = data => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.register(data);
        }catch(e){
            if(e.response.status === 401){
                return dispatch({ type: 'ERROR_MAIL_CONFIRMATION', payload: 'Failed to sign up' });
            }
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR_MAIL_EXISTS', payload: 'Failed to sign up' })
            }
        }
        
        if(!response){
            dispatch({ type: 'ERROR', payload: 'Failed to sign up' });
        }
        if (response.status === 200) {
            dispatch({ type: 'REGISTER' });
        } 
    }
}

export const registerClinicAdmin = (data, clinic_id) => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.registerClinicAdmin(data, clinic_id);
        }catch(e){
            console.log(e.response.data);
            
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR_MAIL_EXISTS', payload: 'Failed to sign up' })
            }
        }
    }
}



export const registerClinicalCenterAdmin = data => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.registerClinicalCenterAdmin(data);
        }catch(e){            
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR_MAIL_EXISTS', payload: 'Failed to sign up' })
            }
        }
    }
}

export const changePassword = data => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.changePassword(data);
        }catch(e){            
           
        }
    }
}

export const login = data => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.login(data);

        }catch(e){
            if(e.response.status === 401)
                return dispatch({ type: 'ERROR', payload: 'Account not activated' });
            if(e.response.status === 500)
                return dispatch({ type: 'ERROR', payload: 'Failed to sign in' });
        }
        if (response.status === 200) {            
           return dispatch({ type: 'LOGIN', payload: response.data });
        } 
    }
}

export const me = () => {

    return async dispatch => {
        let response;
        try{
            response = await usersService.fetchCurrentUser();

        }catch(e){
            return dispatch({ type: 'ERROR', payload: 'Token invalid' });
        }
        if(!response){
           return dispatch({ type: 'ERROR', payload: 'Token invalid' });
        }
        if (response.status === 200) {            
           return dispatch({ type: 'ME', payload: response.data });
        } 
    }
}

export const logout = () => {

    return async dispatch => {
        let response;
        try{
            response = await usersService.logoutUser();

        }catch(e){
            return dispatch({ type: 'ERROR', payload: 'Token invalid' });
        }
        if(!response){
           return dispatch({ type: 'ERROR', payload: 'Token invalid' });
        }
        if (response.status === 200) {            
           return dispatch({ type: 'LOGOUT', payload: response });
        } 
    }
}