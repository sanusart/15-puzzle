import pkg from '../../package.json';
import * as ACTION from '../actions/puzzle';

const initialState = {
  loading: false,
  app: {
    name: pkg.name,
    version: pkg.version,
  },
  gameWon: false,
  gameTileNumbers: false,
  gameInProgress: false,
  hallOfFame: [],
  boardWidth: 320,
  background: '/images/bg.jpg',
};

export default function puzzleReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.LOADING: {
      const updates = { loading: action.loading };

      return { ...state, ...updates };
    }

    case ACTION.GAME_START: {
      const updates = { gameInProgress: true };

      return { ...state, ...updates };
    }

    case ACTION.GAME_WON: {
      const updates = {
        gameInProgress: false,
        gameWon: !state.gameWon,
      };

      return { ...state, ...updates };
    }

    case ACTION.TOGGLE_TILE_NUMBERS: {
      const updates = {
        gameTileNumbers: !state.gameTileNumbers,
      };

      return { ...state, ...updates };
    }

    case ACTION.SET_BOARD_SIZE: {
      const updates = { boardWidth: +action.size };

      return { ...state, ...updates };
    }

    case ACTION.SYNC_STORAGE: {
      const updates = {};

      if (
        state.hallOfFame.length === 0 &&
        window.localStorage.getItem('hallOfFame')
      ) {
        updates.hallOfFame = JSON.parse(
          window.localStorage.getItem('hallOfFame'),
        );
      }

      return { ...state, ...updates };
    }

    case ACTION.CHANGE_BACKGROUND_RESULT: {
      const updates = { background: action.bg };

      return { ...state, ...updates };
    }

    case ACTION.ADD_TO_WALL_OF_FAME: {
      const updates = {
        gameInProgress: false,
        gameWon: false,
      };

      if (window.localStorage.getItem('hallOfFame')) {
        updates.hallOfFame = JSON.parse(
          window.localStorage.getItem('hallOfFame'),
        );
      } else {
        updates.hallOfFame = [];
      }

      const newUser = {
        name: action.args.name,
        time: action.args.time,
        moves: action.args.moves,
      };

      updates.hallOfFame.push(newUser);
      window.localStorage.setItem(
        'hallOfFame',
        JSON.stringify(updates.hallOfFame),
      );
      updates.hallOfFame = JSON.parse(
        window.localStorage.getItem('hallOfFame'),
      );

      return { ...state, ...updates };
    }

    default: {
      return state;
    }
  }
}
