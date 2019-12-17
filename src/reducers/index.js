import { combineReducers } from 'redux';
import authReducer from './auth';
import patientsReducer from './patients'
import locationReducer from './Location/suggestedLocations';
import selectedLocationReducer from './Location/selectedLocation';
import clinicsReducer from './clinics';
import fetchedUsersLocation from './Location/fetchedUsersLocation';
import clinicAdminReducer from './clinicAdmin';
import prescriptionsReducer from './prescriptions';
import operatingRoomsReducer from './operatingRooms';
import appointmentTypesReducer from './appointmentTypes';
import appointmentReducer from './appointmentReducer';

export default combineReducers({
   auth: authReducer,
   patients: patientsReducer,
   suggestedLocations: locationReducer,
   selectedLocation: selectedLocationReducer,
   clinics: clinicsReducer,
   usersLocation: fetchedUsersLocation,
   clinicAdmin: clinicAdminReducer,
   prescriptions: prescriptionsReducer,
   operatingRooms: operatingRoomsReducer,
   appointmentTypes: appointmentTypesReducer,
   appointments: appointmentReducer
});