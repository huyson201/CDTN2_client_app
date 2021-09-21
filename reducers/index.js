import { combineReducers } from "redux";
import searchReducer from './search'

const reducers = {
    search: searchReducer
}
export const rootReducer = combineReducers(reducers);

export default rootReducer;