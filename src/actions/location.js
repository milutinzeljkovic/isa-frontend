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

export const fetchUsersLoction = () => {
    return async dispatch => {
        await navigator.geolocation.getCurrentPosition((position) =>{
            console.log('pozicija', position);
            
            dispatch({ type: 'FETCHED_USERS_LOCATION', payload: position })
        });

    }
}


export const selectLocation = location => {
    return { type: 'SELECTED_LOCATION', payload: location };
}

export const resetSuggestedLocations = () => {
    return { type: 'RESET_SUGGESTED_LOCATIONS' };
}