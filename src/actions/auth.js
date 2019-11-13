import { ServiceFactory } from '../services/ServiceFactory';
const usersService = ServiceFactory.get('users');

export const register = data => {
    return async dispatch => {
        const response = await usersService.register(data);
        if (response.status === 200) {
            dispatch({ type: 'REGISTER' });
        } else {
            dispatch({ type: 'ERROR', payload: 'Failed to sign up' });
        }
    }
}