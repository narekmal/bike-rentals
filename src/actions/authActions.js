import {AUTH_END, LOGOUT} from './types';

export function logout(){
  return {
    type: LOGOUT
  }
}

export function login(userName, password){
  console.log('here');
  return function(dispatch){

    dispatch({
      type: AUTH_END,
      isAuth: true,
      userName: userName,
      role: userName === 'fake manager' ? 'manager' : 'user'
    });
  }
}




// export function createUser(userName, password){
//   return function(dispatch){
//     dispatch({type: AUTH_START});
//     axios
//       .get(config.apiUrl, { params: {
//         operation: 'createnewuser',
//         username: userName,
//         password: password
//       }})
//       .then(response => {
//         dispatch({
//           type: AUTH_END,
//           authToken: response.data.token,
//           justCreatedUser: response.data.token ? true : false,
//           userName: userName
//         });
//       })
//       .catch(error => {console.log(error);});
//   }
// }