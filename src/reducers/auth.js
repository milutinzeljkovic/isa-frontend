const INITIAL_STATE = {
    loginStatus: null
};

export default (state = INITIAL_STATE, action) => {    
    switch(action.type) {
        case 'REGISTER':
            return {...state, currentUser: action.payload}
        break;
        case 'ERROR':
            return {...state, loginStatus: action.payload}
        break;
        case 'LOGIN':
            localStorage.setItem('token',action.payload.access_token)            
            return {...state, accessToken: action.payload.access_token}
        break;
        case 'ME':
            return {...state, currentUser: action.payload}
            
        default:
            return state;
    }
};