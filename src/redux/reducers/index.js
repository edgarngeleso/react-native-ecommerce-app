import {combineReducers} from "redux";
import Reducer from "./Reducer";
//import loginReducer from "./loginReducer";

let reducers = combineReducers({
    Reducer:Reducer,
})

const rootReducer = (state,action)=>{
    return reducers(state,action);
}

export default rootReducer;
 

