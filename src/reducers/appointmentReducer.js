export default (state = null, action) => {
    switch(action.type){
        case 'APPOINTMENT_RESERVED':            
            return state;
        case 'APPOINTMENT_HISTORY':            
            return action.payload;
        case 'APPOINTMENT_REQUESTED':            
            return {...state, reservedAppointment: action.payload}
        case 'FETCH_APPOINTMENTS':
            return {...state, appointments: action.payload}
            
        default: return state;
    }

}