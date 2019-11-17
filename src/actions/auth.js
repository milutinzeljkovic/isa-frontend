import { ServiceFactory } from '../services/ServiceFactory';
const usersService = ServiceFactory.get('users');

export const register = data => {
    return async dispatch => {
        let response;
        
        response = await usersService.register(data);
        
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
        
        response = await usersService.login(data);
        
        if(!response){
            dispatch({ type: 'ERROR', payload: 'Failed to sign in' });
        }
        if (response.status === 200) {
            dispatch({ type: 'LOGIN', payload: response.data });
        } 
    }
}
