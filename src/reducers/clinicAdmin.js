export default (state = null, action) => {
    switch (action.type) {
        case 'REGISTERMEDSTAFF':
            return action.payload;
        case 'GETALLDOCTORS':
            return action.payload;
        case 'GET_OPERATIONS':
            return { ...state, operations: action.payload }
        case 'CLINIC_DOCTORS':
            return { ...state, clinicDoctors: action.payload }
        case 'FETCHING_DOCTORS_ERROR':
            return state;
        case 'FETCH_CLINIC_ADMIN_CLINIC':
            return { ...state, clinic: action.payload };
        case 'DELETE-DOCTOR':
            return state.filter(val => val.id !== action.payload);
        case 'DOCTORS_BY_APP_TYPES':
            return {...state, clinicDoctors: action.payload};
        case 'CLINIC_AVERAGE_RATING':
            return {...state, clinicRatingAvg: action.payload};
        case 'DOCTORS_AVERAGE_RATING':
            return {...state, doctorsRatings: action.payload};
        case 'EARNED_MONEY':
            return {...state, earnedMoney: action.payload};
        case 'WEEKLY_REPORT':
            return {...state, weeklyReport: action.payload};
        case 'MONTHLY_REPORT':
            return {...state, monthlyReport: action.payload.reverse()};
        default: return state;
    }

}