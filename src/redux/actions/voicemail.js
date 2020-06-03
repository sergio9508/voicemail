import {
  GET_VOICEMAIL,
  CLEAN_VOICEMAIL,
  POST_VOICEMAIL,
  LOADING_POST,
} from "redux/actions/types";

const serverUrl = "https://sandbox.2600hz.com:8443/v2";
const credentials =
  "NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=";
const requestUrl = `${serverUrl}/`;
const headers = {
  Authorization: `Basic ${credentials}`,
  "Content-Type": "application/json",
};
const account_id = "4642e64040cdb8b89c310a21a07c7f62";
const box_id = "b37675a2d7b90d60f0ee5d4175502394";

export const getVoicemail = () => (dispatch) => {
  console.log("im here");

  fetch(`${requestUrl}accounts/${account_id}/vmboxes/${box_id}/messages`, {
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

export const patchVoicemail = (body, id) => (dispatch) => {
  dispatch({ type: LOADING_POST });
  console.log(JSON.stringify(body));

  fetch(
    `${requestUrl}accounts/${account_id}/vmboxes/${box_id}/messages/${id}`,
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
