import pkg from '../../package.json';
import * as ACTION from '../actions/puzzle';

const initialState = {
  app: {
    name: pkg.name,
    vesion: pkg.version
  },
  gameWon: false,
  gameTileNumbers: false,
  gameInProgress: false,
  hallOfFame: [],
  boardWidth: 320
};

export default function puzzleReducer(state = initialState, action) {

  const prevState = state;

  switch (action.type) {
    case ACTION.GAME_START: {
      prevState.gameInProgress = true;
      return Object.assign({}, prevState);
    }

    case ACTION.GAME_WON: {
      prevState.gameInProgress = false;
      prevState.gameWon = prevState.gameWon=!prevState.gameWon;
      return Object.assign({}, prevState);
    }

    case ACTION.TOGGLE_TIME_NUMBERS: {
      prevState.gameTileNumbers = prevState.gameTileNumbers = !prevState.gameTileNumbers;
      return Object.assign({}, prevState);
    }

    case ACTION.ADD_TO_WALL_OF_FAME: {
      if(window.localStorage.getItem('hallOfFame')) {
        prevState.hallOfFame = JSON.parse(window.localStorage.getItem('hallOfFame'));
      }
      let newUser = {
        name: action.args.name,
        time: action.args.time,
        moves: action.args.moves
      };
      prevState.hallOfFame.push(newUser);
      window.localStorage['hallOfFame'] = JSON.stringify(prevState.hallOfFame);
      prevState.hallOfFame = JSON.parse(window.localStorage.getItem('hallOfFame'));
      prevState.gameInProgress = false;
      prevState.gameWon = false;
      return Object.assign({}, prevState);
    }

    case ACTION.SET_BOARD_SIZE: {
      prevState.boardWidth = action.size;
      return Object.assign({}, prevState);
    }

    case ACTION.SYNC_STORAGE: {
      if(prevState.hallOfFame.length === 0 && window.localStorage.getItem('hallOfFame')) {
        prevState.hallOfFame = JSON.parse(window.localStorage.getItem('hallOfFame'));
      }
      return Object.assign({}, prevState);
    }

    default: {
      return prevState;
    }
  }

};
