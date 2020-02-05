import { ServiceFactory } from '../services/ServiceFactory';
const operatingRoomService = ServiceFactory.get('operatingRoom');

export const newOpRoom = data => {
    return async dispatch => {
        try{
            await operatingRoomService.newOpRoom(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }
    }
}

export const getAllOpRooms = () => {
    return async dispatch => {
        let response;
        try{
            response = await operatingRoomService.getOpRooms();
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }
        if(response){
            if(response.status === 200){
                return dispatch({ type: 'GETALLOPROOMS', payload: response.data })
            }
        }

    }
}

export const seeIfBookedOpRoom = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await operatingRoomService.seeIfBookedOpRoom(id);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }

        if(response.status === 200){
            dispatch({type: 'SET-UPDATABLE', payload: response.data});
        }
    }
}

export const deleteOperatingRoom = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await operatingRoomService.deleteOperatingRoom(id);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }

        if(response.status === 200){
            dispatch({type: 'DELETE_OPERATING_ROOM', payload: response.data});
        }
    }
}

export const updateOpRoom = (data) => {
    return async dispatch => {
        try{
            await operatingRoomService.updateOperatingRoom(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }
    }
}

export const searchOperatingRooms = (data) => {
    return async dispatch => {
        let response;
        try{
            response = await operatingRoomService.searchOperatingRooms(data);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }

        if(response.status === 200){
            return dispatch({ type: 'SET-OPERATING-ROOMS', payload: response.data})
        }
    }
}

export const setOperatingRoomCalendar = (data) => {
    return dispatch => {
        dispatch({ type: 'OPERATING-ROOM-CALENDAR', payload: data});
    }
}

export const getAppointmentsOpRoom = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await operatingRoomService.getAppointmentsOpRoom(id);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }

        if(response.status === 200){
            dispatch({type: 'SET-OPERATING-ROOM-APPOINTMENTS', payload: response.data});
        }
    }
}

export const getFirstFreeDate = (id) => {
    return async dispatch => {
        let response;
        try{
            response = await operatingRoomService.getFirstFreeDate(id);
        }catch(e){
            if(e.response.status === 500){
                return dispatch({ type: 'ERROR', payload: 'error' })
            }
        }

        if(response.status === 200){
            dispatch({type: 'SET-FIRST-FREE-DATE', payload: response.data});
        }
    }
}
