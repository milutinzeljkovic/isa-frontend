import { ServiceFactory } from '../services/ServiceFactory';
const workingHoursService = ServiceFactory.get('workingHours');


export const getDoctorsWorkingHours = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await workingHoursService.getDoctorsWorkingHours(id);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    dispatch({ type: 'ERROR', payload: 'error'});
                }
            }
        }

        if(response.status === 200){
            dispatch({ type: 'SET-WORKING-HOURS', payload: response.data});
        }
    }
}

export const updateDoctorsWorkingDay = (data,id) => {
    return async dispatch => {
        try{
            await workingHoursService.updateDoctorsWorkingDay(data,id);
        }catch(e){
            if(e.response !== undefined){
                if(e.response.status === 500){
                    dispatch({ type: 'ERROR', payload: 'error'});
                }
            }
        }
    }
}
