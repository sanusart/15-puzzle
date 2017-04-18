import React from 'react';
import PropTypes from 'prop-types';
import GitHubRibbon from './github-ribbon';

const Puzzle = props => (
  <div className="Puzzle">
    <GitHubRibbon
      url="https://github.com/sanusart/15-puzzle"
      fill="tomato"
      color="#D2D2F7"
    />
    { props.children }
  </div>
);

Puzzle.propTypes = {
  children: PropTypes.node
};

export default Puzzle;
