export default (state = null, action) => {
    switch(action.type){
        case 'GETALLAPPTYPES':
            return  action.payload;
        default: return state;
    }

}