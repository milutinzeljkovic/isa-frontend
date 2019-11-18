const INITIAL_STATE = {
    loginStatus: null
};

export default (state = INITIAL_STATE, action) => {    
    switch(action.type) {
        case 'REGISTER':
            return {...state, currentUser: action.payload}
        case 'ERROR':
            return {...state, loginStatus: action.payload}
        case 'LOGIN':
            localStorage.setItem('token',action.payload.access_token)            
            return {...state, accessToken: action.payload.access_token}
        case 'ME':
            return {...state, currentUser: action.payload}
            
        default:
            return state;
    }
};