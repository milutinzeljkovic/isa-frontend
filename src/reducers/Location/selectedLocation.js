export default (state=null, action) => {
    switch(action.type) {
        case 'SELECTED_LOCATION':
            const { lng, lat } = action.payload.geometry.location;
            return { ...state, lng, lat, usersLocation: action.payload.formatted_address };           
        default: 
            return state;
    }
}