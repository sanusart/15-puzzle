import pkg from '../package.json';

module.exports = {
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
  }
};
