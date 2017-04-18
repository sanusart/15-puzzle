import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTouchEvents from 'react-touch-events';
import moment from 'moment';
import * as actions from '../../actions/puzzle';
import Tile from './Tile';
import Loading from '../Loading';
import Button from '../Button';
import WinModal from './Win-modal';

export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [].concat(...Array(16).keys(), 0).slice(1),
      time: 0,
      moves: 0,
      countInterval: '',
      boardWidth: 320,
      randomizer: 50,
      isMobile: false,
    };
  }

  componentWillMount() {
    const isMobile = !window.matchMedia('(min-width: 1025px)').matches;

    if (isMobile !== this.state.isMobile) {
      this.setState({ isMobile });
    }
    this.props.changeBackground();
    window.addEventListener('keyup', this.keyPressHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameInProgress && this.state.time === 0) {
      this.startTimer();
    }

    if (nextProps.gameWon && this.state.time > 0) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyPressHandler);
    this.stopTimer();
  }

  setBoardWidth = () => {
    this.props.setBoardSize(this.boardWidth.value);
    this.setState({
      boardWidth: +this.boardWidth.value,
    });
  };

  toggleTileNumbers = () => {
    this.props.toggleTileNumbers();
  };

  isSolved = () => {
    if (this.state.tiles.toString() === [].concat(...Array(16).keys(), 0).slice(1).toString()) {
      this.props.gameWon();
    }
  };

  stopTimer = () => {
    clearInterval(this.state.countInterval);
  };

  startTimer = () => {
    const now = moment().unix();
    const countInterval = setInterval(
      () =>
        this.setState({
          time: moment().unix() - now,
        }),
      1000,
    );

    this.setState({
      countInterval,
    });
  };

  recordMove = () => {
    this.setState({
      moves: this.state.moves + 1,
    });
  };

  randomize(speed = 200) {
    let i = 0;
    const shuffler = window.setInterval(
      () => {
        const arr = [this.moveDown, this.moveUp, this.moveRight, this.moveLeft];
        const rand = Math.floor(Math.random() * arr.length);
        const randomFunction = arr[rand];

        randomFunction();
        if (i >= (this.props.location.query.easy ? 3 : this.state.randomizer)) {
          clearInterval(shuffler);
          this.props.gameStart();
        }
        i++;
      },
      speed,
    );
  }

  changeImage = () => {
    this.props.changeBackground();
  };

  keyPressHandler = (event) => {
    if (!this.props.gameInProgress) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
        this.moveUp(true);
        break;
      case 'ArrowDown':
        this.moveDown(true);
        break;
      case 'ArrowLeft':
        this.moveLeft(true);
        break;
      case 'ArrowRight':
        this.moveRight(true);
        break;
      default:
    }
  };

  handleSwipe(direction) {
    if (!this.props.gameInProgress) {
      return;
    }
    switch (direction) {
      case 'top':
        this.moveUp(true);
        break;
      case 'bottom':
        this.moveDown(true);
        break;
      case 'left':
        this.moveLeft(true);
        break;
      case 'right':
        this.moveRight(true);
        break;
      default:
    }
  }

  moveDown = (record) => {
    const { tiles } = this.state;
    const emptyIdx = tiles.indexOf(0);

    if (emptyIdx > 3) {
      tiles[emptyIdx] = tiles[emptyIdx - 4];
      tiles[emptyIdx - 4] = 0;
      this.setState({
        tiles,
      });
      if (record) {
        this.recordMove();
        this.isSolved();
      }
    }
  };

  moveUp = (record) => {
    const { tiles } = this.state;
    const emptyIdx = tiles.indexOf(0);

    if (emptyIdx <= 11) {
      tiles[emptyIdx] = tiles[emptyIdx + 4];
      tiles[emptyIdx + 4] = 0;
      this.setState({
        tiles,
      });
      if (record) {
        this.recordMove();
        this.isSolved();
      }
    }
  };

  moveRight = (record) => {
    const { tiles } = this.state;
    const emptyIdx = tiles.indexOf(0);

    if (emptyIdx % 4 !== 0) {
      tiles[emptyIdx] = tiles[emptyIdx - 1];
      tiles[emptyIdx - 1] = 0;
      this.setState({
        tiles,
      });
      if (record) {
        this.recordMove();
        this.isSolved();
      }
    }
  };

  moveLeft = (record) => {
    const { tiles } = this.state;
    const emptyIdx = tiles.indexOf(0);

    if (![3, 7, 11, 15].includes(emptyIdx)) {
      tiles[emptyIdx] = tiles[emptyIdx + 1];
      tiles[emptyIdx + 1] = 0;
      this.setState({
        tiles,
      });
      if (record) {
        this.recordMove();
        this.isSolved();
      }
    }
  };

  desktopMobileMsg() {
    return this.state.isMobile
      ? <span>Hit start and swipe tiles</span>
      : <span>
          Hit start and move with arrows <key>←</key>
        <key>↑</key>
        <key>↓</key>
        <key>→</key>
      </span>;
  }

  renderTiles() {
    return this.state.tiles.map((tile) => {
      if (tile === 0) {
        return <Tile empty content={ tile } key={ tile } />;
      }
      return <Tile content={ tile } key={ tile } />;
    });
  }

  render() {
    return (
      <div
        className="board"
        style={ { width: `${this.props.boardWidth}px` || '320px' } }
      >
        <div className="flex-row">
          <h1>{this.props.appName}</h1>
          <Button
            className="btn-start"
            to="/hall-of-fame"
            text="Hall of fame"
          />
        </div>

        {this.props.gameInProgress
          ? <div className="running-props">
              Made {this.state.moves} moves in: {this.state.time} secs.
            </div>
          : <div className="running-props">
            {this.desktopMobileMsg()}
          </div>}

        <ReactCSSTransitionGroup
          transitionAppear
          transitionAppearTimeout={ 700 }
          transitionName="fadeIn"
          transitionEnterTimeout={ 700 }
          transitionLeaveTimeout={ 700 }
        >
          {this.props.isGameWon && <WinModal
            moves={ this.state.moves }
            time={ this.state.time }
          />}
        </ReactCSSTransitionGroup>

        <ReactTouchEvents onSwipe={ this.handleSwipe.bind(this) }>
          <div
            className="board"
            style={ { width: `${this.props.boardWidth}px` || '320px' } }
          >
            {this.renderTiles()}
          </div>
        </ReactTouchEvents>

        <div className="flex-row">
          <Button
            className="btn-start fill"
            onClick={ this.randomize.bind(this, 200) }
            text="Start"
          />
          <Button
            className="btn-start"
            onClick={ this.toggleTileNumbers }
            text="Toggle tiles numbers"
          />
        </div>

        <div className="flex-row hr-top">
          <div>Width:</div>
          <input
            type="range"
            defaultValue="320"
            step="5"
            min="240"
            max="400"
            onChange={ this.setBoardWidth }
            ref={ width => (this.boardWidth = width) }
          />
          <div>
            {(this.boardWidth && this.boardWidth.value) ||
              this.state.boardWidth}
          </div>
        </div>
        {window.navigator.onLine
          ? <div className="image-changer">
            {this.props.loading
                ? <Loading />
                : <Button
                  className="btn-start"
                  onClick={ this.changeImage }
                  text="Different image"
                />}
          </div>
          : null}
      </div>
    );
  }
}

Board.propTypes = {
  gameInProgress: PropTypes.bool,
  appName: PropTypes.string,
  gameWon: PropTypes.func,
  loading: PropTypes.bool,
  boardWidth: PropTypes.number,
  gameStart: PropTypes.func,
  isGameWon: PropTypes.bool,
  toggleTileNumbers: PropTypes.func,
  changeBackground: PropTypes.func,
  setBoardSize: PropTypes.func
};

const mapStateToProps = state => ({
  gameInProgress: state.puzzle.gameInProgress,
  appName: state.puzzle.app.name,
  loading: state.puzzle.loading,
  boardWidth: state.puzzle.boardWidth,
  isGameWon: state.puzzle.gameWon
});

export default connect(mapStateToProps, {
  changeBackground: actions.changeBackground,
  addToWallOfFame: actions.addToWallOfFame,
  gameStart: actions.gameStart,
  gameWon: actions.gameWon,
  toggleTileNumbers: actions.toggleTileNumbers,
  setBoardSize: actions.setBoardSize
})(Board);
