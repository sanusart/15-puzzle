import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTouchEvents from "react-touch-events";
import {Link} from 'react-router';
import moment from 'moment';
import Tile from './Tile';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
      time: 0,
      moves: 0,
      countInterval: '',
      boardWidth: 320,
      validation: '',
      randomizer: 50

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
    this.addToHallOfFame = this.addToHallOfFame.bind(this);
    this.validation = this.validation.bind(this);
    this.setBoardWidth = this.setBoardWidth.bind(this);
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
        return;
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
        return;
    }
  }

  moveDown(record) {
    let {tiles} = this.state;
    let emptyIdx = tiles.indexOf(0);
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
    let {tiles} = this.state;
    let emptyIdx = tiles.indexOf(0);
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
    let {tiles} = this.state;
    let emptyIdx = tiles.indexOf(0);
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
    let {tiles} = this.state;
    let emptyIdx = tiles.indexOf(0);
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

  randomize() {
    let i = 0;
    let shuffler = window.setInterval(() => {
      const arr = [this.moveDown, this.moveUp, this.moveRight, this.moveLeft];
      let rand = Math.floor(Math.random() * arr.length);
      let randomFunction = arr[rand];
      randomFunction();
      if (i >= (this.props.location.query.easy ? 3 : this.state.randomizer)) {
        clearInterval(shuffler);
        this.props.actions.gameStart();
      }
      i++;
    }, 200);
  }

  recordMove() {
    this.setState({
      moves: this.state.moves + 1
    })
  }

  renderTiles() {
    return this.state.tiles.map((tile, key) => {
      return (
        tile === 0 ?
          <Tile empty {...this.props} content={tile} key={key}/> : <Tile {...this.props} content={tile} key={key}/>
      );
    });
  }

  startTimer() {
    let now = moment().unix();
    let countInterval = setInterval(() => this.setState({
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

  validation() {
    if (this.userName.value.length < 3) {
      this.setState({
        validation: 'User name must be longer than 3 characters'
      });
      return false;
    } else if (this.userName.value.match(/[^a-zA-Z0-9]/)) {
      this.setState({
        validation: 'Please only use a-z and 0-9 characters'
      });
      return false;
    } else {
      return true;
    }

  }

  addToHallOfFame() {
    if(this.validation()) {
      this.props.actions.addToWallOfFame({
        name: this.userName.value,
        time: this.state.time,
        moves: this.state.moves
      });
    }
  }

  winModal() {
    return (
      <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
        <div className="won">
          <h2>Solved!!!</h2>
          <p>It took you {this.state.moves} moves and {this.state.time} seconds to sove it.</p>
          <div>
            <div>Add your name to hall of fame:
              <input required type="text" ref={(user) => this.userName = user}/>
              <a className="btn-start" onClick={this.addToHallOfFame}>Add</a>
              <a className="btn-start close" onClick={this.isSolved}>X</a>
            </div>
            {this.state.validation ? <p className="text-danger">{this.state.validation}</p> : null}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  setBoardWidth() {
    this.props.actions.setBoardSize(this.boardWidth.value);
    this.setState({
      boardWidth: this.boardWidth.value
    })
  }

  componentDidMount() {
    window.addEventListener('keyup', this.keyPressHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.puzzle.gameInProgress) {
      this.startTimer();
    }

    if (nextProps.puzzle.gameWon) {
      this.stopTimer();
    }
  }

  render() {
    return (
      <div className="board" style={{width: `${this.props.puzzle.boardWidth}px` || '320px'}}>

        <div className="flex-row">
          <h1>{this.props.puzzle.app.name}</h1>
          <Link className="btn-start" to="/hall-of-fame">Hall of fame</Link>
        </div>

        {this.props.puzzle.gameInProgress ?
          <div className="running-props">Made {this.state.moves} moves in: {this.state.time} secs.</div>
          : this.props.puzzle.gameWon ? this.winModal()
            : <div className="running-props">Hit start and move with arrows <key>&larr;</key><key>&uarr;</key><key>&darr;</key><key>&rarr;</key></div>}

        <ReactTouchEvents onSwipe={ this.handleSwipe.bind(this) }>
          <div className="board" style={{width: `${this.props.puzzle.boardWidth}px` || '320px'}}>
            {this.renderTiles()}
          </div>
        </ReactTouchEvents>

        <div className="flex-row">
          <a className="btn-start fill" onClick={this.randomize}>Start</a>
          <a className="btn-start" onClick={this.toggleTileNumbers}>Toggle tiles numbers</a>
        </div>

        <div className="flex-row hr-top">
          <span>Width:</span>
          <input type="range" defaultValue="320" step="5" min="240" max="400" onChange={this.setBoardWidth}
                 ref={(w) => this.boardWidth = w}/>
          <span>{(this.boardWidth && this.boardWidth.value) || this.state.boardWidth}</span>
        </div>
      </div>
    );
  }
}
