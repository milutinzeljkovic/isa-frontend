import { ServiceFactory } from '../services/ServiceFactory';
const vacationService = ServiceFactory.get('vacation');

export const getVacationRequests = () => {
    return async dispatch => {
        let response;
        try{
            response = await vacationService.getVacationRequests();
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }

        if(response.status === 200){
            dispatch({type: 'SET-VACATIONS', payload: response.data});
        }
    }
}

export const declineVacationRequest = (id, message) => {
    return async dispatch => {
        let response;
        try{
            response = await vacationService.declineVacationRequest(id, message);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }

        if(response.status === 200){
            dispatch({type: 'DECLINE-VACATION', payload: response.data});
        }
    }
}

export const approveVacationRequest = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await vacationService.approveVacationRequest(id);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }

        if(response.status === 200){
            dispatch({type: 'APPROVE-VACATION', payload: response.data});
        }
    }
}
