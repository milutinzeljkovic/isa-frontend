export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_CLINICS':
            return  {...state, all: action.payload};
        case 'SELECTED_CLINIC':
            return {...state, selectedClinic: action.payload};
        case 'FETCH_CLINIC_DOCTORS':
            return {...state, clinicDoctors: action.payload };
        case 'CLINIC_RATED':
            let clinicIndex;
            state.all.forEach((clinic,index) => {
                if(clinic.id === action.payload.id){
                    clinicIndex = index;
                }
            });
            let newClinics = {...state.all};
            newClinics[clinicIndex] = action.payload;

            return state;

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

            let newClinicDoctors = {...state.clinicDoctors};
            newClinicDoctors[doctorIndex].appointments.splice(appointmentIndex,1);

            return {...state, clinicDoctors: newClinicDoctors};

        default: return state;
    }

}