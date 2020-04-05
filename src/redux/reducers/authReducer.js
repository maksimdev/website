export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';


export function authorize(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
}

export function logOut(payload) {
  return {
    type: LOGOUT
  };
}

const initState = {
  isAuthenticated: false,
  user: '',
  token: ''
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state,  ...action.payload }
    case LOGOUT:
        return { isAuthenticated: false, user: '',  token: ''}
    default:
      return state
  }
}

export default authReducer