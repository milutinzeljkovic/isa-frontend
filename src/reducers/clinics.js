export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_CLINICS':
            return  {...state, all: action.payload};
        case 'SELECTED_CLINIC':
            return {...state, selectedClinic: action.payload};
        case 'FETCH_CLINIC_DOCTORS':
            return {...state, clinicDoctors: action.payload };
        default: return state;
    }

}