import { combineReducers } from 'redux';
import authReducer from './auth';
import patientsReducer from './patients'

export default combineReducers({
   auth: authReducer,
   patients: patientsReducer
});