export default (state = null, action) => {
    switch(action.type){
        case 'REGISTERMEDSTAFF':
            return  action.payload;
        
        default: return state;
    }

}