export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_PATIENTS':
            return  action.payload;
        case 'ACCEPT_REGISTRATION':
            return {...state, acceptReg: 'Registration accepted'}
        case 'DECLINE_REGISTRATION':
            return {...state, declineReg: 'Registration declined'}
        default: return state;
    }

}