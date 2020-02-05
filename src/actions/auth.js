import { ServiceFactory } from '../services/ServiceFactory';
const usersService = ServiceFactory.get('users');

export const register = data => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.register(data);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 401){
                    return dispatch({ type: 'ERROR_MAIL_CONFIRMATION', payload: 'Failed to sign up' });
                }
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR_MAIL_EXISTS', payload: 'Failed to sign up' })
                }
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
       
        try{
            await usersService.registerClinicAdmin(data, clinic_id);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR_MAIL_EXISTS', payload: 'Failed to sign up' })
                }
            }
        }
    }
}



export const registerClinicalCenterAdmin = data => {
    return async dispatch => {
        try{
             await usersService.registerClinicalCenterAdmin(data);
        }catch(e){
            if(e.response !== undefined){            
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR_MAIL_EXISTS', payload: 'Failed to sign up' })
                }
            }
        }
    }
}

export const vacation = data => {
    return async dispatch => {
        try{
             await usersService.vacation(data);
        }catch(e){
            if(e.response !== undefined){            
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR_MAIL_EXISTS', payload: 'Failed to sign up' })
                }
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
            if(e.response !== undefined){
                if(e.response.status === 401){
                    return dispatch({ type: 'PASSWORD_CHANGE_ERROR', payload: e.response.data.error})
                }
            }
        }

        if(response.status === 201){
            return dispatch({ type: 'CHANGE_PASSWORD'})
        }
    }
}

export const login = data => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.login(data);

        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 401)
                    return dispatch({ type: 'ERROR', payload: e.response.data.error });
                
                    if(e.response.status === 500)
                    return dispatch({ type: 'ERROR', payload: 'Failed to sign in' });
            }
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
            if(e.response !== undefined){
                return dispatch({ type: 'ERROR', payload: 'Token invalid' });
            }
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
            if(e.response !== undefined){
                return dispatch({ type: 'ERROR', payload: 'Token invalid' });
            }
        }
        if(!response){
           return dispatch({ type: 'ERROR', payload: 'Token invalid' });
        }
        if (response.status === 200) {            
           return dispatch({ type: 'LOGOUT', payload: response });
        } 
    }
}