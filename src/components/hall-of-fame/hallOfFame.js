import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/puzzle';
import './hall-of-fame.css';

export class hallOfFame extends Component {

  state = {
    filter: ''
  };

  componentWillMount() {
    this.props.syncStorage();
  }

  ordinal = num => (
    <span>{num}<sup>{['st', 'nd', 'rd'][(num % 10) - 1] || 'th'}</sup></span>
  );

  filter = (event) => {
    this.setState({
      filter: event.currentTarget.value
    });
  };

  render() {
    if (this.props.hallOfFame.length === 0) {
      return (
        <div className="hall-of-fame">
          <Link className="btn-start" to="/"> « back</Link>
          <h1><strong>{this.props.appName}: </strong> HALL OF FAME</h1>
          <p>No entries</p>
        </div>
      );
    }

    return (
      <div className="hall-of-fame">
        <Link className="btn-start" to="/"> « back</Link>
        <h1><strong>{this.props.appName}: </strong> HALL OF FAME</h1>

        <input type="search" onChange={ this.filter } placeholder="Filter by name" />

        <table>
          <tbody>

            {this.props.hallOfFame
              .filter(player => player.name.match(this.state.filter))
              .sort((a, b) => a.time - b.time)
              .map((player, idx) => (
                <tr key={ `${player.time}-${idx}-${player.name}${player.moves}` } >
                  <td>
                    {!this.state.filter && <span className="label">
                      {this.ordinal(idx + 1)} place
                    </span> }
                    {' '}
                    <strong>{player.name}</strong>
                    {' '}
                    finished in
                    {' '}
                    <strong>{player.moves}</strong>
                    {' '}
                    moves, it took
                    {' '}
                    <strong>{player.time}</strong>
                    {' '}
                    second(s)
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
      </div>
    );
  }
}

hallOfFame.propTypes = {
  hallOfFame: PropTypes.array,
  syncStorage: PropTypes.func,
  appName: PropTypes.string
};

const mapStateToProps = state => ({
  appName: state.puzzle.app.name,
  hallOfFame: state.puzzle.hallOfFame
});

export default connect(mapStateToProps, {
  syncStorage: actions.syncStorage
})(hallOfFame);
