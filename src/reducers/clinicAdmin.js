export default (state = null, action) => {
    switch(action.type){
        case 'REGISTERMEDSTAFF':
            return  action.payload;
        case 'GETALLDOCTORS':
            return action.payload;
        case 'FETCHING_DOCTORS_ERROR':
            return state;
        case 'FETCH_CLINIC_ADMIN_CLINIC':
            return action.payload;
        default: return state;
    }

}