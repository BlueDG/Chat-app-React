import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDrNjo6LHp21akRQeq7GOZDnqZoiV9BFgY",
  authDomain: "chatbox-app-gdg.firebaseapp.com",
  databaseURL: "https://chatbox-app-gdg.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());
export { firebaseApp };
export default base;
