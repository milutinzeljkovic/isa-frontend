export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_PATIENTS':
            return  action.payload;
        case 'FETCH_PATIENTS_BY_CLINIC':
            return  action.payload;
        case 'ACCEPT_REGISTRATION':
            return state.filter(val => val.id !== action.payload )
        case 'DECLINE_REGISTRATION':            
            return state.filter(val => val.id !== action.payload )
        case 'SEARCHEDPATIENTS':
            return  {...state, searchedPatients: action.payload};
        default: return state;
    }

}