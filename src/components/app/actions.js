import { ERROR_CLEAR, } from './reducers';
import { auth } from '../../services/firebase';
export const clearError = () => ({ type: ERROR_CLEAR });

export const login = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if(user) {
        console.log(user);
      } else {
        console.log('no user');
      }
    });
  };
};