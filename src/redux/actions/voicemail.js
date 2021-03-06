import {
  GET_VOICEMAIL,
  CLEAN_VOICEMAIL,
  POST_VOICEMAIL,
  LOADING_POST,
  SET_VOICEMAIL_ID,
} from "redux/actions/types";
import {store} from "redux/store";

const serverUrl = "https://sandbox.2600hz.com:8443/v2";
const credentials =
  "NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=";
const requestUrl = `${serverUrl}/`;
const headers = {
  Authorization: `Basic ${credentials}`,
  "Content-Type": "application/json",
};
const account_id = "4642e64040cdb8b89c310a21a07c7f62";

//function to get all voicemail from api
export const getVoicemail = () => (dispatch) => {
  let voicemail_id = store.getState().voicemail.id;
  fetch(`${requestUrl}accounts/${account_id}/vmboxes/${voicemail_id}/messages`, {
    headers,
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((res) => {
        dispatch({
          type: GET_VOICEMAIL,
          data: res,
        });
      });
    }
  });
};

//function to update the status form voicemail 
export const patchVoicemail = (body, id) => (dispatch) => {
  dispatch({ type: LOADING_POST });
  let voicemail_id = store.getState().voicemail.id;
  fetch(
    `${requestUrl}accounts/${account_id}/vmboxes/${voicemail_id}/messages/${id}`,
    {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    }
  ).then((response) => {
    if (response.status === 200) {
      response.json().then((res) => {
        dispatch({
          type: POST_VOICEMAIL,
        });
        dispatch(getVoicemail());
      });
    }
  });
};

export const cleanVoiceMail = () => (dispatch) => {
  dispatch({
    type: CLEAN_VOICEMAIL,
  });
};

export const setVoicemailId = (id) => (dispatch) =>{
  dispatch({
    type: SET_VOICEMAIL_ID,
    id: id
  });
  dispatch(getVoicemail());
}