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
            return  {...state, searchedPatients: action.payload}
        case 'GET_ONE_PATIENT':
            return {...state, selectedPatient: action.payload}
        case 'MEDICAL_RECORD_FETCHED':
            return {...state, medicalRecord: action.payload}
        case 'PATIENTS_APPOINTMENTS':
            return {...state, patientsAppointments: action.payload}
        default: return state;
    }

}