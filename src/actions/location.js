import { ServiceFactory } from '../services/ServiceFactory';
const locationService = ServiceFactory.get('location');

export const getSuggestedLocations = location => {
    return async dispatch => {
        let response;
        try{
            response = await locationService.searchLocation(location);
        }catch(e){
            
        }
        dispatch({type: 'GET_SUGGESTED_LOCATIONS',payload: response});
    }
}


export const selectLocation = location => {
    return { type: 'SELECTED_LOCATION', payload: location };
}

export const resetSuggestedLocations = () => {
    return { type: 'RESET_SUGGESTED_LOCATIONS' };
}