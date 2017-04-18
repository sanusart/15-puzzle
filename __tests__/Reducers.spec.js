import reducer from '../src/reducers/puzzle';
import * as action from '../src/actions/puzzle';

// Mock localStorage
import '../__mocks__/localStorage';

describe('puzzle reducer', () => {
  it('should match the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toMatchObject({
      boardWidth: 320,
      gameInProgress: false,
      gameTileNumbers: false,
      gameWon: false,
      hallOfFame: []
    });
  });

  it('should handle GAME_START', () => {
    expect(
      reducer([], {
        type: action.GAME_START
      })
    ).toMatchObject({
      gameInProgress: true
    });
  });

  it('should handle GAME_WON', () => {
    expect(
      reducer([], {
        type: action.GAME_WON
      })
    ).toMatchObject({
      gameWon: true
    });
  });

  it('should handle TOGGLE_TIME_NUMBERS', () => {
    expect(
      reducer(undefined, {
        type: action.TOGGLE_TILE_NUMBERS
      })
    ).toMatchObject({
      gameTileNumbers: true
    });
  });

  it('should handle ADD_TO_WALL_OF_FAME', () => {
    expect(
      reducer(undefined, {
        type: action.ADD_TO_WALL_OF_FAME,
        args: {
          name: 'jest',
          time: 1000,
          moves: 100
        }
      })
    ).toMatchObject({
      hallOfFame: [{
        name: 'jest',
        time: 1000,
        moves: 100
      }]
    });
  });

  it('should handle SET_BOARD_SIZE', () => {
    expect(
      reducer([], {
        type: action.SET_BOARD_SIZE,
        size: 321
      })
    ).toMatchObject({
      boardWidth: 321
    });
  });
});
