const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();
const playersRef = db.ref('players');
const gamesRef = db.ref('games');
const movesRef = db.ref('moves');
const userGamesRef = db.ref('userGames');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.playerQueue = functions.database.ref('/players/{uid}').onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const { uid } = context.params;

      return playersRef.once('value')
        .then(snapshot => {
          const [player] = Object.keys(snapshot.val())
            .filter(key => key !== uid);

          if(!player) return null; // eslint-disable-line
          
          const newGameRef = gamesRef.push();

          return Promise.all([
            newGameRef.set({ player1: uid, player2: player }),
            playersRef.child(uid).remove(),
            playersRef.child(player).remove(),
            userGamesRef.child(uid).child(newGameRef.key).set(true),
            userGamesRef.child(player).child(newGameRef.key).set(true)
          ]);
          
        });
    });

    exports.moveQueue = functions.database.ref('/moves/{gameKey}/{uid}').onCreate((snapshot, context) => {
      const { gameKey } = context.params;

      const gamesMovesRef = movesRef.child(gameKey);

      return gamesMovesRef.once('value')
        .then(snapshot => {
          const game = snapshot.val();
          const moves = Object.keys(game)
            .map(key => ({
              uid: key,
              play: game[key] 
            }));
            if(moves.length < 2) return null;

            const roundRef = gamesRef.child(gameKey).child('rounds').push();

            return Promise.all([
              gamesMovesRef.remove(),
              roundRef.set({
                moves,
                winner: calculateWinner(moves)
              })
            ]);
        });
    });

    const calculateWinner = ([move1, move2]) => {
      if(isWinner(move1.play, move2.play)) return move1.uid;
      if(isWinner(move2.play, move1.play)) return move2.uid;
      return null;
    };

    const isWinner = (play1, play2) => {
      if(play1 === 'FIRE' && play2 === 'GRASS') return true;
      if(play1 === 'GRASS' && play2 === 'WATER') return true;
      if(play1 === 'WATER' && play2 === 'FIRE') return true;
      return false;
    };