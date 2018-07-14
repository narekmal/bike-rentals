import {AUTH_END, LOGOUT} from '../actions/types';

let initialState = {
  auth: {
    isAuth: false,
    role: '', // 'user' or 'manager'
    userName: '',
    userId: 0
  }
}

// initialState = {
//   auth: {
//     isAuth: true,
//     role: 'user',
//     userName: 'redux user',
//     userId: 3
//   }
// }

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