export default (state = null, action) => {
    switch(action.type){
        case 'ENTITY_TO_BE_UPDATED':
            return  {...state, toUpdate: action.payload};
        case 'SET-UPDATABLE':
            return {...state, updatable: action.payload};
        case 'SET-WORKING-HOURS':
            return {...state, workingHoursUpdate: action.payload};
        case 'DOCTORS-OPTIONS-APP-TYPE':
            return {...state, allAppointments: action.payload};
        default: return state;
    }
    
}