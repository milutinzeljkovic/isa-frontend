export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_CLINICS':
            return  action.payload;
        default: return state;
    }

}