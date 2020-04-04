export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export function authorize(payload) {
  return {
    type: LOGIN,
    payload
  };
}

export function logOut(payload) {
  return {
    type: LOGOUT
  };
}

const initState = {
  isAuthenticated: true, //false!
  user: '',
  token: ''
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true,  ...action.payload }
    case LOGOUT:
        return { isAuthenticated: false, user: '',  token: ''}
    default:
      return state
  }
}

export default authReducer