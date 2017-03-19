import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTouchEvents from 'react-touch-events';
import moment from 'moment';
import Tile from './Tile';
import Loading from '../Loading';
import Button from '../Button';
import WinModal from './Win-modal';

export default class Board extends Component {

  static propTypes = {
    puzzle: React.PropTypes.shape({
      gameInProgress: React.PropTypes.bool,
      app: React.PropTypes.shape({
        name: React.PropTypes.string
      }),
      gameWon: React.PropTypes.bool,
      loading: React.PropTypes.bool,
      boardWidth: React.PropTypes.number
    }),
    actions: React.PropTypes.shape({
      gameStart: React.PropTypes.func,
      gameWon: React.PropTypes.func,
      toggleTileNumbers: React.PropTypes.func,
      changeBackground: React.PropTypes.func
    })
  };

  static defaultProps = {
    puzzle: {},
    actions: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
      time: 0,
      moves: 0,
      countInterval: '',
      boardWidth: 320,
      randomizer: 50,
      isMobile: false
    };
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.randomize = this.randomize.bind(this);
    this.recordMove = this.recordMove.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.isSolved = this.isSolved.bind(this);
    this.toggleTileNumbers = this.toggleTileNumbers.bind(this);
    this.setBoardWidth = this.setBoardWidth.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  componentDidMount() {
    const isMobile = !window.matchMedia('(min-width: 1025px)').matches;
    if (isMobile !== this.state.isMobile) {
      this.setState({ isMobile });
    }
    this.props.actions.changeBackground();
    window.addEventListener('keyup', this.keyPressHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyPressHandler);
    this.stopTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.puzzle.gameInProgress && this.state.time === 0) {
      this.startTimer();
    }

    if (nextProps.puzzle.gameWon && this.state.time > 0) {
      this.stopTimer();
    }
  }

  recordMove() {
    this.setState({
      moves: this.state.moves + 1
    });
  }

  renderTiles() {
    return this.state.tiles.map((tile, key) => (
      tile === 0 ?
        <Tile empty {...this.props} content={tile} key={key} /> :
        <Tile {...this.props} content={tile} key={key} />
    ));
  }

  startTimer() {
    const now = moment().unix();
    const countInterval = setInterval(() => this.setState({
      time: moment().unix() - now
    }), 1000);
    this.setState({
      countInterval
    });
  }

  stopTimer() {
    clearInterval(this.state.countInterval);
  }

  isSolved() {
    if (this.state.tiles.toString() === [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0].toString()) {
      this.props.actions.gameWon();
    }
  }

  toggleTileNumbers() {
    this.props.actions.toggleTileNumbers();
  }

  setBoardWidth() {
    this.props.actions.setBoardSize(this.boardWidth.value);
    this.setState({
      boardWidth: +this.boardWidth.value
    });
  }

  randomize() {
    let i = 0;
    const shuffler = window.setInterval(() => {
      const arr = [this.moveDown, this.moveUp, this.moveRight, this.moveLeft];
      const rand = Math.floor(Math.random() * arr.length);
      const randomFunction = arr[rand];
      randomFunction();
      if (i >= (this.props.location.query.easy ? 3 : this.state.randomizer)) {
        clearInterval(shuffler);
        this.props.actions.gameStart();
      }
      i++;
    }, 200);
  }

  changeImage() {
    this.props.actions.changeBackground();
  }

  keyPressHandler(ev) {
    if (!this.props.puzzle.gameInProgress) {
      return;
    }
    switch (ev.key) {
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
  }

  handleSwipe(direction) {
    if (!this.props.puzzle.gameInProgress) {
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

  moveDown(record) {
    const { tiles } = this.state;
    const emptyIdx = tiles.indexOf(0);
    if (emptyIdx > 3) {
      tiles[emptyIdx] = tiles[emptyIdx - 4];
      tiles[emptyIdx - 4] = 0;
      this.setState({
        tiles
      });
      if (record) {
        this.recordMove();
        this.isSolved();
      }
    }
  }

  moveUp(record) {
    const { tiles } = this.state;
    const emptyIdx = tiles.indexOf(0);
    if (emptyIdx <= 11) {
      tiles[emptyIdx] = tiles[emptyIdx + 4];
      tiles[emptyIdx + 4] = 0;
      this.setState({
        tiles
      });
      if (record) {
        this.recordMove();
        this.isSolved();
      }
    }
  }

  moveRight(record) {
    const { tiles } = this.state;
    const emptyIdx = tiles.indexOf(0);
    if (emptyIdx % 4 !== 0) {
      tiles[emptyIdx] = tiles[emptyIdx - 1];
      tiles[emptyIdx - 1] = 0;
      this.setState({
        tiles
      });
      if (record) {
        this.recordMove();
        this.isSolved();
      }
    }
  }

  moveLeft(record) {
    const { tiles } = this.state;
    const emptyIdx = tiles.indexOf(0);
    if (![3, 7, 11, 15].includes(emptyIdx)) {
      tiles[emptyIdx] = tiles[emptyIdx + 1];
      tiles[emptyIdx + 1] = 0;
      this.setState({
        tiles
      });
      if (record) {
        this.recordMove();
        this.isSolved();
      }
    }
  }

  desktopMobileMsg() {
    return this.state.isMobile ?
      <span>Hit start and swipe tiles</span>
      : <span>Hit start and move with arrows <key>&larr;</key><key>&uarr;</key><key>&darr;</key><key>&rarr;</key></span>;
  }

  render() {
    return (
      <div className="board" style={{ width: `${this.props.puzzle.boardWidth}px` || '320px' }}>
        <div className="flex-row">
          <h1>{this.props.puzzle.app.name}</h1>
          <Button className="btn-start" to="/hall-of-fame" text="Hall of fame" />
        </div>

        {this.props.puzzle.gameInProgress ?
          <div className="running-props">Made {this.state.moves} moves in: {this.state.time} secs.</div>
          : <div className="running-props">
            {this.desktopMobileMsg()}
          </div>}

        <ReactCSSTransitionGroup
          transitionAppear
          transitionAppearTimeout={700}
          transitionName="fadeIn"
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}>
          {this.props.puzzle.gameWon ? <WinModal actions={this.props.actions} moves={this.state.moves} time={this.state.time} /> : null}
        </ReactCSSTransitionGroup>

        <ReactTouchEvents onSwipe={this.handleSwipe.bind(this)}>
          <div className="board" style={{ width: `${this.props.puzzle.boardWidth}px` || '320px' }}>
            {this.renderTiles()}
          </div>
        </ReactTouchEvents>

        <div className="flex-row">
          <Button className="btn-start fill" onClick={this.randomize} text="Start" />
          <Button className="btn-start" onClick={this.toggleTileNumbers} text="Toggle tiles numbers" />
        </div>

        <div className="flex-row hr-top">
          <div>Width:</div>
          <input
            type="range"
            defaultValue="320"
            step="5"
            min="240"
            max="400"
            onChange={this.setBoardWidth}
            ref={w => this.boardWidth = w}
          />
          <div>{(this.boardWidth && this.boardWidth.value) || this.state.boardWidth}</div>
        </div>
        {window.navigator.onLine ? <div className="image-changer">
          {this.props.puzzle.loading ?
            <Loading />
            : <Button className="btn-start" onClick={this.changeImage} text="Different image" />}
        </div> : null}
      </div>
    );
  }
}
