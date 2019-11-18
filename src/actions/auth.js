import { ServiceFactory } from '../services/ServiceFactory';
const usersService = ServiceFactory.get('users');

export const register = data => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.register(data);
        }catch(e){
            console.log(response);
            return dispatch({ type: 'ERROR', payload: 'Failed to sign up' });
        }
        
        if(!response){
            dispatch({ type: 'ERROR', payload: 'Failed to sign up' });
        }
        if (response.status === 200) {
            dispatch({ type: 'REGISTER' });
        } 
    }
}

export const login = data => {
    return async dispatch => {
        let response;
        try{
            response = await usersService.login(data);

        }catch(e){
            return dispatch({ type: 'ERROR', payload: 'Failed to sign in' });
        }
        
        if(!response){
           return dispatch({ type: 'ERROR', payload: 'Failed to sign in' });
        }
        if (response.status === 200) {
           return dispatch({ type: 'LOGIN', payload: response.data });
        } 
    }
}
