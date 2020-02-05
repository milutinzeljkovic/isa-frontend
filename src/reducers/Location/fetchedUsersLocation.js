export default (state=null, action) => {
    switch(action.type) {
        case 'FETCHED_USERS_LOCATION':  
            //const coords = action.payload.coords;
            console.log('FETCHED_USERS_LOCATION', action.payload.coords);
            const res = action.payload.coords;
            console.log(action.payload.coords);
            
            return  res
        default: 
            return state;
    }
}