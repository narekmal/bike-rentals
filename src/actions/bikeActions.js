import {BIKES_RETRIEVED} from './types';
import config from '../Config';

export function getBikes(){
  return function(dispatch){
    fetch(`${config.apiBaseUrl}/api/getBikes`)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: BIKES_RETRIEVED,
          bikes: json
        });
      })
      .catch(err => err.text().then(errorMessage => console.log(errorMessage)));
  }
}