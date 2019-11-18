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
            console.log(action.payload);
        break;
        default:
            return state;
    }
};