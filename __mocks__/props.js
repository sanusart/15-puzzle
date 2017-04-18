import pkg from '../package.json';

const props = {
  puzzle: {
    app: {
      name: pkg.name,
      vesion: pkg.version
    },
    gameWon: false,
    gameTileNumbers: false,
    gameInProgress: false,
    hallOfFame: [],
    boardWidth: 320
  },
  changeBackground: jest.fn(() => {
    return {};
  })
};

module.exports = props;
