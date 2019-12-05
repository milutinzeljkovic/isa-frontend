const INITIAL_STATE = {
    loginStatus: null,
    mailConfirmationPending: false,
    mailAlreadyExists: false
};

export default (state = INITIAL_STATE, action) => {    
    switch(action.type) {
        case 'REGISTER':
            return {...state, currentUser: action.payload, mailConfirmationPending: true}
        case 'ERROR':
            return {...state, loginStatus: action.payload}
        case 'ERROR_MAIL_CONFIRMATION':
            return {...state, mailConfirmationPending: true}
        case 'ERROR_MAIL_EXISTS':
            return {...state, mailAlreadyExists: true,}
        case 'LOGIN':
            localStorage.setItem('token',action.payload.access_token)            
            return {...state, accessToken: action.payload.access_token}
        case 'ME':
            if(action.payload.email === undefined){
                return {...state, currentUser: undefined, access_token: null, mailConfirmationPending: false,mailAlreadyExists: false,     loginStatus: null,}
            }
            return {...state, currentUser: action.payload}
        case 'LOGOUT':
            localStorage.setItem('token','');            
            return {...state, currentUser: undefined, access_token: null,mailConfirmationPending: false}
        case 'REGISTER_CLINIC_ADMIN':
            return {...state, succesfullyRegisteredClinicAdmin: true}
        case 'REGISTER_CLINICAL_CENTER_ADMIN':
            return {...state}
        case 'CHANGE_PASSWORD':
            return {...state, oldPasswordError: ''}
        case 'PASSWORD_CHANGE_ERROR':
            return {...state, oldPasswordError: action.payload}
        default:
            return state;
    }
};