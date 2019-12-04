export default (state=null, action) => {
    switch(action.type) {
        case 'FETCHED_USERS_LOCATION':  
            const coords = action.payload.coords;
            return coords;
        default: 
            return state;
    }
}