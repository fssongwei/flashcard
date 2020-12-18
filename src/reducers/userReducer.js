import { FETCH_USER, LOGOUT } from "../actions/types";

const userReducer = (state = null, action) => {
  if (action.type === FETCH_USER || action.type === LOGOUT) {
    return action.payload;
  }
  return state;
};

export default userReducer;
