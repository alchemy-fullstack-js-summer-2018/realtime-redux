import { ERROR_CLEAR, ERROR, USER_LOAD, getUser } from './reducers';
import { auth } from '../../services/firebase';
import { playersRef, userGamesref } from '../../services/firebaseRef';
export const clearError = () => ({ type: ERROR_CLEAR });

export const login = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if(user) {
        dispatch({
          type: USER_LOAD,
          payload: user
        });

        watchGames(user.uid);

      } else {
        auth.signInAnonymously()
          .catch(err => {
            dispatch({
              type: ERROR,
              payload: err.message
            });
          });
      }
    });
  };
};

export const requestGame = () => {
  return (dispatch, getState) => {
    const user = getUser(getState());
    playersRef.child(user.uid).set(true)
      .catch(console.log);
  };
};

export const watchGames = uid => {
  userGamesref.child(uid).on('value', snapshot => {
    const games = Object.keys(snapshot.val());
  });
}