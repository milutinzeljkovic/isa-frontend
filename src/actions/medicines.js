import { ServiceFactory } from '../services/ServiceFactory';
const medicineService = ServiceFactory.get('medicine');


export const addMedicine = data => {
    return async dispatch => {
        try{
            await medicineService.addMedicine(data);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }
        
    }
}


export const getMedicines = () => {
    return async dispatch => {
        try{
            let response =await medicineService.getMedicines();
            return dispatch({ type: 'GET_MEDICINES', payload: response.data })
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    return dispatch({ type: 'ERROR', payload: 'error' })
                }
            }
        }
        
    }
}

