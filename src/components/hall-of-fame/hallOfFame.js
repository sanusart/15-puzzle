import React, { Component } from 'react';
import { Link } from 'react-router';
import pkg from '../../../package.json';
import './hall-of-fame.css';

export default class hallOfFame extends Component {

  static propTypes = {
    puzzle: React.PropTypes.shape({
      hallOfFame: React.PropTypes.array
    }),
    actions: React.PropTypes.shape({
      syncStorage: React.PropTypes.func
    })
  };

  componentWillMount() {
    this.props.actions.syncStorage();
  }

  ordinal(d) {
    return d + (['st', 'nd', 'rd'][(d % 10) - 1] || 'th');
  }

  render() {
    if (this.props.puzzle.hallOfFame.length === 0) {
      return (
        <div className="hall-of-fame">
          <Link className="btn-start" to="/"> &laquo; back</Link>
          <h1><strong>{pkg.name}: </strong> HALL OF FAME</h1>
          <p>No entries</p>
        </div>
      );
    }
    return (
      <div className="hall-of-fame">
        <Link className="btn-start" to="/"> &laquo; back</Link>
        <h1><strong>{pkg.name}: </strong> HALL OF FAME</h1>
        <table>
          <tbody>

            {this.props.puzzle.hallOfFame
            .sort((a, b) => a.time - b.time)
            .map((p, idx) => (
              <tr key={idx}>
                <td>
                  <span className="label">{this.ordinal.bind(this, idx + 1)} place</span> <strong>{p.name}</strong> finished in <strong>{p.moves}</strong> moves, it took <strong>{p.time}</strong> second(s)
                </td>
              </tr>
              ))}

          </tbody>
        </table>
      </div>
    );
  }

}
