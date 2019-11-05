export default (state=null, action) => {
    switch(action.type) {
        case 'AKCIJA':
            return { ...state, rezultatAkcije: action.payload };           
        default: 
            return state;
    }
}