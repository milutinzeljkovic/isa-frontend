export default (state = null, action) => {
    switch(action.type){
        case 'APPOINTMENT_RESERVED':
            console.log('appointment reserved', action.payload);
            
            return state;
        default: return state;
    }

}