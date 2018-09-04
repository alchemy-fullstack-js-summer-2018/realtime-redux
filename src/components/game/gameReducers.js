export const GAME_LOAD = 'GAME_LOAD';
export const IMAGE_LOAD = 'IMAGE_LOAD';

export const getGame = state => state.game;
export const getImages = state => state.images;

export function game(state = null, { type, payload }) {
  return type === GAME_LOAD ? payload : state;
}

export function images(state = {}, { type, payload }) {
  return type === IMAGE_LOAD ? payload : state;
}