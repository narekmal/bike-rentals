import {AUTH_START, AUTH_END, LOGOUT, BIKES_RETRIEVED} from '../actions/types';

let initialState = {
  auth: {
    isAuth: false,
    isAuthenticating: null,
    role: '', // 'user' or 'manager'
    userName: '',
    userId: 0
  },
  bikes: null,
  filters: {}
}

initialState = {
  auth: {
    isAuth: true,
    role: 'user',
    userName: 'User1',
    userId: 9
  },
  bikes: null,
  filters: {}
}

export default function(state = initialState, action) {
  switch(action.type){
    case AUTH_START:
      return {
        ...state,
        auth: {
          isAuthenticating: true,
        }
      };
    case AUTH_END:
      return {
        ...state,
        auth: {
          isAuthenticating: false,
          isAuth: action.authenticated,
          role: action.userRole,
          userName: action.userName,
          userId: action.userId
        }
      };
    case LOGOUT:
      return {
        ...state,
        auth: {
          isAuth: false
        }
      };
    case BIKES_RETRIEVED:
      return {
        ...state,
        bikes: action.bikes
      };
    default:
      return state;
  }
}