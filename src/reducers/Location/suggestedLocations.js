import _ from 'lodash';

export default (state=[], action) => {
    switch(action.type) {
        case 'GET_SUGGESTED_LOCATIONS':
            console.log(action.payload.data.results);
            
            return _.uniqBy(action.payload.data.results, 'formatted_address'); 
        case 'RESET_SUGGESTED_LOCATIONS': 
            return [];           
        default: 
            return state;
    }
}

