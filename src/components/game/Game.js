import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGame } from './reducers';
import { getUser } from '../app/reducers';
import { loadGame, unloadGame, move } from './actions';
import rock from '../../assets/rock.png';
import paper from '../../assets/paper.jpg';
import scissors from '../../assets/scissors.png';

class Game extends Component {
  static propTypes = {
    match: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    loadGame: PropTypes.func.isRequired,
    unloadGame: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { match, loadGame } = this.props;
    loadGame(match.params.gameKey);
  }

  componentWillUnmount() {
    const { match, unloadGame } = this.props;
    unloadGame(match.params.gameKey);  
  }

  render() { 
    /* eslint-disable-next-line */
    const { game, user, move } = this.props;
    if(!game || !user) return null;

    const { uid } = user;
    const who = player => player === uid ? 'You' : 'Some Other Player';

    const player1 = who(game.player1);
    const player2 = who(game.player2);

    return (
      <section id="gameplay">
        <h2>Welcome to the Game!</h2>
        <p id="gameheadline">
          {player1} vs {player2}
        </p>

        <ul>
          {game.rounds && Object.keys(game.rounds).map((key, i) => {
            const round = game.rounds[key];
            return (
              <li key={i}>
                <ul>
                  {round.moves.map(move => (
                    <li key={move.uid}>{who(move.uid)}: {move.play}</li>
                  ))}
                  <li className="winner">Winner: {who(round.winner)}</li>
                </ul>
              </li>
            );
          })}
        </ul>

        <p>
          <h2>Click on an Image to Play the Game!</h2>
          {/* eslint-disable-next-line */}
          {[<img src={rock} width="100" />, <img src={paper} width="100" height="100" />, <img src={scissors} width="100" height="100" />].map(play => (
            <button 
              key={play}
              onClick={() => move(play)}>
              {play}
            </button>
          ))}
        </p>
      
      </section>
    );
  }
}
 
export default connect(
  (state) => ({
    game: getGame(state),
    user: getUser(state)
  }),
  { loadGame, unloadGame, move }
)(Game);