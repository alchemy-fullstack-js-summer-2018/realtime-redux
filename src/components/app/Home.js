import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getUser, getGames } from './reducers';
import { requestGame } from './actions';

class Home extends Component {

  static propTypes = {
    user: PropTypes.object,
    requestGame: PropTypes.func.isRequired
  };
  render() { 
    const { user, requestGame } = this.props;

    return (
      <div>
        <h2>Play for a 33.333333% chance of winning!</h2>
        { 
          user && <section>
            <button onClick={requestGame}>Duel</button>
          </section>
        }
      </div>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state),
    games: getGames(state)
  }),
  { requestGame }
) (Home);