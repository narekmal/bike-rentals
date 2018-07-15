import {AUTH_START, AUTH_END, LOGOUT} from './types';
import config from '../Config';

export function logout(){
  return {
    type: LOGOUT
  }
}

export function fakeLogin(userName, password){
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

export function login(userName, password){
  return function(dispatch){
    dispatch({type: AUTH_START});

    let formData = new FormData();
    formData.append("userName", userName);
    formData.append("password", password);

    fetch(`${config.apiBaseUrl}/api/authenticate`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {

        console.log(json)
        dispatch({type: AUTH_END, authenticated: json.authenticated, userId: json.userId, userName: json.userName, userRole: json.userRole});

      })
      .catch(err => err.text().then(errorMessage => console.log(errorMessage)));
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