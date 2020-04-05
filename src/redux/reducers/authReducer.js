export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const LOGOUT = 'LOGOUT';

export function logOut(payload) {
  return {
    type: LOGOUT
  };
}

export function loginRequestSuccess(payload) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload
  };
}

export function loginRequestFailed(payload) {
  return {
    type: LOGIN_REQUEST_FAILED,
    payload
  };
}

const initState = {
  isAuthenticated: false,
  user: '',
  token: ''
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      return { ...state,  ...action.payload }
    case LOGIN_REQUEST_FAILED:
      return { ...state,  ...action.payload }
    case LOGOUT:
        return { isAuthenticated: false, user: '',  token: ''}
    default:
      return state
  }
}

export default authReducer