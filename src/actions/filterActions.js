import {FILTERS_APPLIED} from './types';

export function applyFilters(filters){
  return function(dispatch){
    console.log(filters);
    dispatch({
      type: FILTERS_APPLIED,
      filters
    });
  }
}