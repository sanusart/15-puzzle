import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Tile = ({ boardWidth, empty, background, content, gameTileNumbers }) => {
  const style = {
    width: `${boardWidth / 4}px`,
    height: `${boardWidth / 4}px`,
    lineHeight: `${boardWidth / 4}px`,
  };
  if (empty) {
    return (
      <div style={ style } className="tile-empty" />
    );
  }
  style.backgroundImage = `url('${background}')`;
  return (
    <div
      style={ style }
      className={ `tile tile-${content}` }
    >
      {gameTileNumbers && <span>{content}</span>}
    </div>
  );
};

Tile.propTypes = {
  boardWidth: PropTypes.number,
  empty: PropTypes.bool,
  content: PropTypes.number,
  background: PropTypes.string,
  gameTileNumbers: PropTypes.bool
};

const mapStateToProps = state => ({
  boardWidth: state.puzzle.boardWidth,
  background: state.puzzle.background,
  gameTileNumbers: state.puzzle.gameTileNumbers
});

export default connect(mapStateToProps, {})(Tile);
