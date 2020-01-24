export default (state = null, action) => {
    switch(action.type){
        case 'GET_MEDICINES':
            return  action.payload;
        default: return state;
    }

}