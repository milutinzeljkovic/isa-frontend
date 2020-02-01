export default (state = null, action) => {
    switch(action.type){
        case 'GETALLOPROOMS':
            return  {...state, operatingRooms: action.payload};
        case 'DELETE_OPERATING_ROOM':
            return state.operatingRooms.filter(val => val.id !== action.payload);
        default: return state;
    }

}