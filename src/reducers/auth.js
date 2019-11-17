const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'REGISTER':
            console.log(action.payload);
            
        case 'ERROR':
            console.log('eror');
            
        default:
            return state;
    }
};