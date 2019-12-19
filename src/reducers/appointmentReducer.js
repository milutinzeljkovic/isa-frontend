export default (state = null, action) => {
    switch(action.type){
        case 'APPOINTMENT_RESERVED':
            console.log('appointment reserved', action.payload);
        case 'APPOINTMENT_HISTORY':
            console.log(action.payload);
            
            return action.payload;
            
        default: return state;
    }

}