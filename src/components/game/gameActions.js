import { GAME_LOAD } from './gameReducers';
import { gamesRef } from '../../services/firebaseRef';

export const loadGame = gameKey => {
  return dispatch => {
    gamesRef.child(gameKey).on('value', snapshot => {
      dispatch({
        type: GAME_LOAD,
        payload: snapshot.val()
      });
    });
  };
};

export const unloadGame = gameKey => {
  gamesRef.child(gameKey).off('value'); 
  return {
    type: GAME_LOAD,
    payload: null
  };
};
