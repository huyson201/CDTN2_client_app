import { combineReducers } from "redux";
import searchReducer from './search'

const reducers = {
    search: searchReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;