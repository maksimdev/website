import { ACTIONS } from '../../constants/constants';

export function logOut(payload) {
  return {
    type: ACTIONS.LOGOUT
  };
}

export function loginRequestSuccess(payload) {
  return {
    type: ACTIONS.LOGIN_REQUEST_SUCCESS,
    payload
  };
}

export function loginRequestFailed(payload) {
  return {
    type: ACTIONS.LOGIN_REQUEST_FAILED,
    payload
  };
}

const initState = {
  isAuthenticated: true,
  user: ''
};

const resetToken = () => localStorage.clear();

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST_SUCCESS:
      return { ...state,  ...action.payload }
    case ACTIONS.LOGIN_REQUEST_FAILED:
      return { ...state,  ...action.payload }
    case ACTIONS.LOGOUT:
        resetToken();
        return { isAuthenticated: false, user: ''}
    default:
      return state
  }
}

export default authReducer