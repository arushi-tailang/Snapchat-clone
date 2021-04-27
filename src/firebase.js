import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDYZOlEAfKYFcqo_HpW4wKlOXGbwTaCUio",
    authDomain: "snapchat-clone-ee276.firebaseapp.com",
    projectId: "snapchat-clone-ee276",
    storageBucket: "snapchat-clone-ee276.appspot.com",
    messagingSenderId: "809073768414",
    appId: "1:809073768414:web:585c0ff8d79527b4964f4f"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider(); /*google popup */


  export { db, auth, storage, provider };

