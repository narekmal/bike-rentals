import {AUTH_START, AUTH_END, LOGOUT} from '../actions/types';

const initialState = {
  auth: {
    isAuth: false,
    role: '', // 'user' or 'manager'
    userName: ''
  }
}

export default function(state = initialState, action) {
  switch(action.type){
    case AUTH_END:
      return {
        ...state,
        auth: {
          isAuth: action.isAuth,
          role: action.role,
          userName: action.userName
        }
      };
    case LOGOUT:
      return {
        ...state,
        auth: {
          isAuth: false
        }
      };
    default:
      return state;
  }
}