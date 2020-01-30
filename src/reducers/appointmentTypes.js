export default (state = null, action) => {
    switch(action.type){
        case 'GETALLAPPTYPES':
            return  action.payload;
        case 'APPOINTMENT_TYPES_CLINIC':
            return {...state, clinicAppointmentTypes: action.payload}
        default: return state;
    }

}