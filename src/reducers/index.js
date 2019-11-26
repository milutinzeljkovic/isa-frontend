import { combineReducers } from 'redux';
import authReducer from './auth';
import patientsReducer from './patients';
import clinicAdminReducer from './clinicAdmin';

export default combineReducers({
   auth: authReducer,
   patients: patientsReducer,
   clinicAdmin:clinicAdminReducer
});