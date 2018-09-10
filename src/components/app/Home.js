import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, getGames } from './reducers';
import { requestGame } from './actions';
import styles from './Home.css';


class Home extends Component {

  static propTypes = {
    user: PropTypes.object,
    games: PropTypes.array.isRequired,
    requestGame: PropTypes.func.isRequired
  };
  render() { 
    const { user, games, requestGame } = this.props;

    return (
      <div className={styles.home}>
        { 
          user && <UserGames games={games} onRequest={requestGame}/>
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

export const UserGames = ({ onRequest, games }) => {
  return (
    <section>
      <button className="duel" onClick={onRequest}>Duel</button>
      <ul>
        {games.map((gameKey, i) => (
          <li key={gameKey}>
            <Link to={`/games/${gameKey}`}>Game {i + 1}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

UserGames.propTypes = {
  games: PropTypes.array.isRequired,
  onRequest: PropTypes.func.isRequired
};