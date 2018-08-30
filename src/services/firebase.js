import firebase from 'firebase';

//grab the below info from the firebase console settings
const config = {
  apiKey: "AIzaSyD8DyO6W8nNpLSDjmF94WWCgdBVGmdO4Sc",
  authDomain: "real-time-redux-rpc.firebaseapp.com",
  databaseURL: "https://real-time-redux-rpc.firebaseio.com",
  projectId: "real-time-redux-rpc",
  storageBucket: "real-time-redux-rpc.appspot.com",
  messagingSenderId: "20320532704"
};

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();