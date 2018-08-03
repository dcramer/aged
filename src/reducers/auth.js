export const ACCESS_TOKEN_FAILURE = 'ACCESS_TOKEN_FAILURE';
export const CHECK_AUTH = 'CHECK_AUTH';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

const initialState = {
  validToken: null,
  isAuthenticating: false,
  user: null,

  loginError: false,
  loginErrorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACCESS_TOKEN_FAILURE: {
      return {
        ...initialState,
        ...state,
        validToken: false,
        isAuthenticating: false,
      };
    }
    case LOGIN:
      return {
        ...state,
        isAuthenticating: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      return {
        validToken: true,
        isAuthenticating: false,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        validToken: false,
        isAuthenticating: false,
        loginError: true,
        loginErrorMessage: action.error.message,
      };
    case LOGOUT:
      return {
        ...initialState,
        validToken: false,
      };
    default:
      return state;
  }
};