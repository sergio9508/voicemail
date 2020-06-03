import { GET_VOICEMAIL, CLEAN_VOICEMAIL, POST_VOICEMAIL, LOADING_POST, SET_VOICEMAIL_ID } from "redux/actions/types";
const initialState = {
  data: [],
  post: false,
  loading: "true",
  id: ""
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VOICEMAIL:
      return {
        ...state,
        data: action.data.data,
        loading: false
      };
    case LOADING_POST:
      return{
        ...state,
        post: true,
      }
    case POST_VOICEMAIL:
      return{
        ...state,
        post: false
      }
    case CLEAN_VOICEMAIL:
      return {
        data: []
      };
    case SET_VOICEMAIL_ID:
      return {
        ...state,
        id: action.id
      }
    default:
      return state;
  }
}
