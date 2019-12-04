import { ServiceFactory } from '../services/ServiceFactory';
const medicineService = ServiceFactory.get('medicine');


export const addMedicine = data => {
    return async dispatch => {
        try{
            await medicineService.addMedicine(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }
        
    }
}

