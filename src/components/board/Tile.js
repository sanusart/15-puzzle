import React, {Component} from 'react';

export default class Tile extends Component {

  render() {
    let style = {
      width: this.props.puzzle.boardWidth/4 + 'px',
      height: this.props.puzzle.boardWidth/4 + 'px',
      lineHeight: this.props.puzzle.boardWidth/4 + 'px'
    };
    if (this.props.empty) {
      return (
        <div style={style} data-tile={this.props.content} className="tile-empty">
          &nbsp;
        </div>
      );
    }
    style.backgroundImage = `url('${this.props.puzzle.background}')`;
    return (
      <div style={style} data-tile={this.props.content} className={`tile tile-${this.props.content}`}>
        {this.props.puzzle.gameTileNumbers ? <span>{this.props.content}</span> : null}
      </div>
    );
  }

}
