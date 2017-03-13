import reducer from '../src/reducers/puzzle';
import * as action from '../src/actions/puzzle';

describe('puzzle reducer', () => {

  it('should match the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toMatchObject({
      "boardWidth": 320,
      "gameInProgress": false,
      "gameTileNumbers": false,
      "gameWon": false,
      "hallOfFame": []
    })
  });

  it('should handle GAME_START', () => {
    expect(
      reducer([], {
        type: action.GAME_START
      })
    ).toMatchObject({
      "gameInProgress": true
    });
  });

  it('should handle GAME_WON', () => {
    expect(
      reducer([], {
        type: action.GAME_WON
      })
    ).toMatchObject({
      "gameWon": true
    });
  });

  it('should handle TOGGLE_TIME_NUMBERS', () => {
    expect(
      reducer([], {
        type: action.TOGGLE_TIME_NUMBERS
      })
    ).toMatchObject({
      "gameTileNumbers": true
    });
  });

  it('should handle SET_BOARD_SIZE', () => {
    expect(
      reducer([], {
        type: action.SET_BOARD_SIZE,
        size: 321
      })
    ).toMatchObject({
      "boardWidth": 321
    });
  });

});
