import { combineReducers } from "redux";
import { cartreducer } from "./cart.reducer";



export let rootReducer = combineReducers({
  cart:cartreducer,
});
