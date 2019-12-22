export default (state = null, action) => {
    switch(action.type){
        case 'GETALLOPROOMS':
            return  {...state, operatingRooms: action.payload};
        default: return state;
    }

}