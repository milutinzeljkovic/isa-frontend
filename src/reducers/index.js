import { combineReducers } from 'redux';
import nekiEntitetReducer from './NekiEntitet/reducerEntitet';


export default combineReducers({
    nekiEntitet: nekiEntitetReducer
});