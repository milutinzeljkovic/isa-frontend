export default (state = null, action) => {
    switch(action.type){
        case 'REGISTERMEDSTAFF':
            return  action.payload;
        case 'GETALLDOCTORS':
            return action.payload;
        case 'FETCHING_DOCTORS_ERROR':
            return state;
        default: return state;
    }

}