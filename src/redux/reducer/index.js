import { combineReducers } from "redux";
import voicemail from "./voicemail";

export default combineReducers({
  voicemail : voicemail
});