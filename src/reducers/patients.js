export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_PATIENTS':
            return  action.payload;
        case 'ACCEPT_REGISTRATION':
            return state.filter(val => val.id !== action.payload )
        case 'DECLINE_REGISTRATION':
            console.log(action.payload);
            
            return state.filter(val => val.id !== action.payload )
        default: return state;
    }
}