import {combineReducers} from 'redux';
import searchReducer from './search';
import userReducer from './user';
const reducers = {
  search: searchReducer,
  user: userReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
