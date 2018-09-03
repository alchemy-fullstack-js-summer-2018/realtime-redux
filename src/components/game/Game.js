import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGame } from './gameReducers';
import { getUser } from '../app/reducers';
import { loadGame, unloadGame, move } from './gameActions';

class Game extends Component {
  static propTypes = {
    match: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    loadGame: PropTypes.func.isRequired,
    unloadGame: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { match, loadGame }  =  this.props;
    loadGame(match.params.gameKey); 
  }
  
  componentWillUnmount() {
    const { match, unloadGame }  =  this.props;
    unloadGame(match.params.gameKey); 
  }

  render() { 
    const { game, user, move } = this.props;
    if(!game || !user) return null;

    const { uid } = user;
    const playerIdentifier = player => player === uid ? 'YOU' : 'OPPONENT';

    const player1 = playerIdentifier(game.player1);
    const player2 = playerIdentifier(game.player2);

    return (
      <section>
        <h2>Players</h2>
        <p>
          {player1} vs {player2}
        </p>

        <ul>
          {game.rounds && Object.keys(game.rounds).map((key, i) => {
            const round = game.rounds[key];
            return (
              <li key={i}>
                {round.moves.map(move => (
                  <span key={move.uid}>{playerIdentifier(move.uid)}: {move.play}</span> 
                ))}
              </li>
            );
          })}
        </ul>

        <p>
          {['WATER', 'SPONGE', 'SCISSORS'].map(play => (
            <button 
              key={play}
              onClick={() => move  (play)}>
              {play}
            </button>
          ))}
        </p>
      </section>
    );
  }
}
 
export default connect(
  state => ({
    game: getGame(state),
    user: getUser(state)
  }),
  { loadGame, unloadGame, move }
)(Game);