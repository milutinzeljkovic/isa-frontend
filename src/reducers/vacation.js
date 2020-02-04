export default (state = null, action) => {
    switch(action.type){
        case 'SET-VACATIONS':
            return  {...state, vacationRequestList: action.payload};
        case 'APPROVE-VACATION':
            return state.vacationRequestList.filter(val => val.id !== action.payload);
        case 'DECLINE-VACATION':
            return state.vacationRequestList.filter(val => val.id !== action.payload);
        default: return state;
    }   
}