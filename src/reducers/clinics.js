export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_CLINICS':
            return  {...state, all: action.payload};
        case 'SELECTED_CLINIC':
            return {...state, selectedClinic: action.payload};
        case 'FETCH_CLINIC_DOCTORS':
            return {...state, clinicDoctors: action.payload };
        case 'APPOINTMENT_RESERVED':
            let doctorIndex;
            let appointmentIndex;
            state.clinicDoctors.forEach((doctor, index) => {
                if(doctor.id === action.payload.doctor_id)
                    doctorIndex = index;
            });

            state.clinicDoctors[doctorIndex].appointments.forEach((appointment, index) => {
                if(appointment.id === action.payload.id)
                    appointmentIndex = index;
            })

            let newState = [...state.clinicDoctors[doctorIndex].appointments];
            newState.splice(action.appointmentIndex, 1);
            let newClinicDoctors = {...state.clinicDoctors};
            newClinicDoctors[doctorIndex].appointments.splice(appointmentIndex,1);

            return {...state, clinicDoctors: newClinicDoctors};

        default: return state;
    }

}