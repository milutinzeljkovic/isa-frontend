export default (state = null, action) => {
    switch(action.type){
        case 'GET_DIAGNOSES':
            return  action.payload;
        default: return state;
    }

}