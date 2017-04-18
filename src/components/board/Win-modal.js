import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../Button';
import * as actions from '../../actions/puzzle';

import './Win-modal.css';

export class WinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: '',
      userName: '',
    };
  }

  validation = () => {
    const { userName } = this.state;

    if (userName.length < 3) {
      this.setState({
        validation: 'User name must be longer than 3 characters',
      });

      return false;
    } else if (userName.match(/[^a-zA-Z0-9]/)) {
      this.setState({
        validation: 'Please only use a-z and 0-9 characters',
      });

      return false;
    }

    return true;
  };

  addToHallOfFame = () => {
    const { moves, time } = this.props;

    if (this.validation()) {
      this.props.addToWallOfFame({
        name: this.state.userName,
        time,
        moves
      });
    }
  };

  userNameUpdate = (event) => {
    this.setState({
      userName: event.currentTarget.value,
    });
  };

  closeModal = () => {
    this.props.gameWon();
  };

  render() {
    const { moves, time } = this.props;

    return (
      <div className="won">
        <h2>Solved!!!</h2>
        <p>
          It took you
          {' '}
          { moves }
          {' '}
          moves and
          {' '}
          { time }
          {' '}
          seconds to solve it.
        </p>
        <div>
          <div>
            Add your name to hall of fame:
            <input required type="text" onChange={ this.userNameUpdate } />
            <Button
              className="btn-start"
              onClick={ this.addToHallOfFame }
              text="Add"
            />
            <Button
              className="btn-start close"
              onClick={ this.closeModal }
              text="X"
            />
          </div>
          {this.state.validation && <p className="text-danger">{this.state.validation}</p>}
        </div>
      </div>
    );
  }
}

WinModal.propTypes = {
  time: PropTypes.number,
  moves: PropTypes.number,
  gameWon: PropTypes.func,
  addToWallOfFame: PropTypes.func
};

export default connect(null, {
  gameWon: actions.gameWon,
  addToWallOfFame: actions.addToWallOfFame
})(WinModal);
