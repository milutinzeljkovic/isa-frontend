const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'REGISTER':
            console.log(action.payload);
            
        case 'ERROR':
            console.log('eror');
        case 'LOGIN':
            console.log(action.payload);
            
            
            
        default:
            return state;
    }
};