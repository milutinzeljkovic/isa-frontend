export default (state = null, action) => {
    switch(action.type){
        case 'GETALLAPPTYPES':
            return  {...state, allAppTypes: action.payload};
        case 'APPOINTMENT_TYPES_CLINIC':
            return {...state, clinicAppointmentTypes: action.payload}
        case 'DELETE_APPOINTMENT_TYPE':
            return state.clinicAppointmentTypes.filter(val => val.id !== action.payload);
        
        default: return state;
      }

}