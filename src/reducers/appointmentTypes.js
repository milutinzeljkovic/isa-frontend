export default (state = null, action) => {
    switch(action.type){
        case 'GETALLAPPTYPES':
            return  {...state, appointmentTypes: action.payload};
        default: return state;
    }

}