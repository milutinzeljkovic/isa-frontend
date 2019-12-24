export default (state = null, action) => {
    switch(action.type){
        case 'APPOINTMENT_RESERVED':            
            return state;
        case 'APPOINTMENT_HISTORY':            
            return action.payload;
        case 'APPOINTMENT_REQUESTED':
            console.log(action.payload);
            
            return {...state, reservedAppointment: action.payload}
            
        default: return state;
    }

}