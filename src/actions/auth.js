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