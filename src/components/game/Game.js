import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGame, getImages } from './gameReducers';
import { getUser } from '../app/reducers';
import { loadGame, unloadGame, move, loadImages } from './gameActions';
import styles from './Game.css';

class Game extends Component {
  static propTypes = {
    match: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    images: PropTypes.object,
    move: PropTypes.func.isRequired,
    loadGame: PropTypes.func.isRequired,
    unloadGame: PropTypes.func.isRequired,
    loadImages: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { match, loadGame, loadImages }  =  this.props;
    loadGame(match.params.gameKey);
    loadImages();
  }
  
  componentWillUnmount() {
    const { match, unloadGame }  =  this.props;
    unloadGame(match.params.gameKey);
  }

  render() { 
    const { game, user, move, images } = this.props;
    if(!game || !user) return null;

    const { uid } = user;
    const playerIdentifier = player => player === uid ? 'YOU' : 'OPPONENT';

    const player1 = playerIdentifier(game.player1);
    const player2 = playerIdentifier(game.player2);

    const { grass, fire, water } = images;

    return (
      <section className={styles.game}>
        <h2>
          {player1} <span>vs</span> {player2}
        </h2>

        <ul>
          {game.rounds && Object.keys(game.rounds).map((key, i) => {
            const round = game.rounds[key];
            return (
              <li key={i}>
                <ul>
                  {round.moves.map(move => (
                    <li key={move.uid}>{playerIdentifier(move.uid)}: {move.play}</li> 
                  ))}
                  <li>Winner: {playerIdentifier(round.winner)}</li>
                </ul>
              </li>
            );
          })}
        </ul>

        <section className="button-section">
          <button className="grass" onClick={() => move('GRASS')}>
            <img src={grass[Math.floor(Math.random() * (grass.length))]}></img>
          </button>
          <button className="water" onClick={() => move('WATER')}>
            <img src={water[Math.floor(Math.random() * (water.length))]}></img>
          </button>
          <button className="fire" onClick={() => move('FIRE')}>
            <img src={fire[Math.floor(Math.random() * (fire.length))]}></img>
          </button>
        </section>
      </section>
    );
  }
}
 
export default connect(
  state => ({
    game: getGame(state),
    user: getUser(state),
    images: getImages(state)
  }),
  { loadGame, unloadGame, move, loadImages }
)(Game);