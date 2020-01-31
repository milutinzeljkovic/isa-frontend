export default (state = null, action) => {
    switch(action.type){
        case 'GETALLAPPTYPES':
            return  {...state, appointmentTypes: action.payload};
        case 'DELETE_APPOINTMENT_TYPE':
            return state.appointmentTypes.filter(val => val.id !== action.payload);
        default: return state;
    }

}