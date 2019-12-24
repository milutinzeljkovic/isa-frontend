export default (state = null, action) => {
    switch(action.type){
        case 'FETCH_CLINICS':
            return  {...state, all: action.payload};
        case 'SELECTED_CLINIC':
            return {...state, selectedClinic: action.payload};
        case 'FETCH_CLINIC_DOCTORS':
            return {...state, clinicDoctors: action.payload, clinicDoctorsResult: action.payload};
        case 'DOCTORS_SEARCH':
            return {...state, clinicDoctors: action.payload, clinicDoctorsResult: action.payload};

        case 'DOCTOR_FILTER':
            const filter = action.payload;
            let docs = state.clinicDoctorsResult;
            
            const result = docs.filter(doc => doc.stars_count > filter.minStars);
            if(filter.maxStars !== 0){
                const res = result.filter(doc => doc.stars_count < filter.maxStars)
                
                return {...state, clinicDoctors: res };

            }
            
            return {...state, clinicDoctors: result };
        case 'CLINIC_DETAILS':
            return {...state, clinicDetails: action.payload};
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

        case 'CLINIC_FETCHED': 
            return {...state, selectedClinic: action.payload};
        default: return state;
    }

}