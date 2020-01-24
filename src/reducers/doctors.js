export default (state = null, action) => {
    switch(action.type){
        case 'DOCTOR_FETCHED':
            return  {...state, selectedDoctor: action.payload};
        case 'FETCH_APPOINTMENT':
                return  {...state, doctorAppointments: action.payload};
        case 'APPOINTMENT_RESERVED':
            let pom = [];
            
            state.selectedDoctor.appointments.forEach(element => {
                if(element.id !== action.payload.id){
                    
                    pom.push(element);
                }
            });
            const doc = {...state.selectedDoctor};
            doc.appointments = pom;
            return {...state, selectedDoctor: doc}


        default: return state;
    }
    
}