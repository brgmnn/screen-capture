import { combineReducers } from "redux";
import recording from "./recording";
import stream from "./stream";

export default combineReducers({
  recording,
  stream,
  empty: (store = null) => store
});
