import React, { Component } from 'react';
import Button from '../Button';

import './Win-modal.css';

export default class WinModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      validation: '',
      userName: ''
    };
    this.addToHallOfFame = this.addToHallOfFame.bind(this);
    this.validation = this.validation.bind(this);
    this.userNameUpdate = this.userNameUpdate.bind(this);
  }

  validation() {
    if (this.state.userName.length < 3) {
      this.setState({
        validation: 'User name must be longer than 3 characters'
      });
      return false;
    } else if (this.state.userName.match(/[^a-zA-Z0-9]/)) {
      this.setState({
        validation: 'Please only use a-z and 0-9 characters'
      });
      return false;
    }
    return true;
  }

  addToHallOfFame() {
    if (this.validation()) {
      this.props.actions.addToWallOfFame({
        name: this.state.userName,
        time: this.props.time,
        moves: this.props.moves
      });
    }
  }

  userNameUpdate(ev) {
    this.setState({
      userName: ev.currentTarget.value
    });
  }

  render() {
    return (
      <div className="won">
        <h2>Solved!!!</h2>
        <p>It took you {this.props.moves} moves and {this.props.time} seconds to solve it.</p>
        <div>
          <div>Add your name to hall of fame:
            <input required type="text" onChange={this.userNameUpdate} />
            <Button className="btn-start" onClick={this.addToHallOfFame} text="Add" />
            <Button className="btn-start close" onClick={this.isSolved} text="X" />
          </div>
          {this.state.validation ? <p className="text-danger">{this.state.validation}</p> : null}
        </div>
      </div>
    );
  }

}
