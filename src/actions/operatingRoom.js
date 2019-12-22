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

        if(response.status === 200){
            return dispatch({ type: 'GETALLOPROOMS', payload: response.data })
        }
    }
}