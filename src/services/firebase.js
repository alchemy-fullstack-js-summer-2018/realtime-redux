import firebase from 'firebase';
  
var config = {
  apiKey: 'AIzaSyB3v3Mmrsyy6tcUXGWcRIr9fB5Z6vqE2yo',
  authDomain: 'rps-game-3ff6e.firebaseapp.com',
  databaseURL: 'https://rps-game-3ff6e.firebaseio.com',
  projectId: 'rps-game-3ff6e',
  storageBucket: 'rps-game-3ff6e.appspot.com',
  messagingSenderId: '852277611248'
};

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();//realtime databae
export const auth = firebaseApp.auth();//firebase auth namespace