import * as actions from '../src/actions/puzzle';

describe('ACTIONS', () => {

  it('gameStart action should be created', () => {
    expect(actions.gameStart()).toEqual({"type": "GAME_START"});
  });

  it('gameWon action should be created', () => {
    expect(actions.gameWon()).toEqual({"type": "GAME_WON"});
  });

  it('toggleTileNumbers action should be created', () => {
    expect(actions.toggleTileNumbers()).toEqual({"type": "TOGGLE_TIME_NUMBERS"});
  });

  it('addToWallOfFame action should be created', () => {
    expect(actions.addToWallOfFame()).toEqual({"type": "ADD_TO_WALL_OF_FAME"});
  });

  it('setBoardSize action should be created', () => {
    expect(actions.setBoardSize()).toEqual({"type": "SET_BOARD_SIZE"});
  });

  it('syncStorage action should be created', () => {
    expect(actions.syncStorage()).toEqual({"type": "SYNC_STORAGE"});
  });

  it('changeBackground action should be created', () => {
      expect(actions.changeBackground()).toEqual({"type": "CHANGE_BACKGROUND_CALL"});
  });

});
