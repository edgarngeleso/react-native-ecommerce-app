import {createStore} from "redux";
//import rootReducer from "./reducers";
import rootReducer from "./reducers/index";

//console.log(createStore)
function configureStore(initialState){
    const store = createStore(rootReducer,initialState);
    return store;
}
export default configureStore;