export const GAME_START = 'GAME_START';
export const GAME_WON = 'GAME_WON';
export const TOGGLE_TIME_NUMBERS = 'TOGGLE_TIME_NUMBERS';
export const ADD_TO_WALL_OF_FAME = 'ADD_TO_WALL_OF_FAME';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';
export const SYNC_STORAGE = 'SYNC_STORAGE';

export function gameStart() {
  return {
    type: GAME_START
  };
}

export function gameWon() {
  return {
    type: GAME_WON
  };
}

export function toggleTileNumbers() {
  return {
    type: TOGGLE_TIME_NUMBERS
  };
}

export function addToWallOfFame(args) {
  return {
    type: ADD_TO_WALL_OF_FAME,
    args
  };
}

export function setBoardSize(size) {
  return {
    type: SET_BOARD_SIZE,
    size
  };
}

export function syncStorage() {
  return {
    type: SYNC_STORAGE
  };
}
