export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_PRESCRIPTIONS':
            return  action.payload;
        case 'CHECK_PRESCRIPTIONS':
            return state.filter(val => val.id !== action.payload )
        default: return state;
    }

}