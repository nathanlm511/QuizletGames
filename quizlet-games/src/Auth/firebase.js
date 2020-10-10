import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBTP5wSTcUqS8KJ8tEUTGGp5Lat2WT8fPM",
  authDomain: "tic-tac-toe-mp-9937e.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-mp-9937e.firebaseio.com",
  projectId: "tic-tac-toe-mp-9937e",
  storageBucket: "tic-tac-toe-mp-9937e.appspot.com",
  messagingSenderId: "924651981828",
  appId: "1:924651981828:web:95bd89e3e960f06bd7b951",
};

export const fire = firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
