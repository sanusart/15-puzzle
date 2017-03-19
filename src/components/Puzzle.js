import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GitgubRibbon from './github-ribbon';
import * as puzzleActions from '../actions/puzzle';

export class Puzzle extends Component {

  render() {
    return (
      <div className="Puzzle">
        <GitgubRibbon
          url="https://github.com/sanusart/15-puzzle"
          fill="tomato"
          color="#D2D2F7"
        />
        {React.cloneElement(this.props.children, {...this.props})}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    puzzle: state.puzzle
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(puzzleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);
