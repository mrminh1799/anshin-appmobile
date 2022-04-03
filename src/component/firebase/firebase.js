import firebase from "firebase/app";
import "firebase/storage"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_bd28_UN7b6d5mCQPUmyW3xYiL2Eayh4",
    authDomain: "anshin-b910b.firebaseapp.com",
    projectId: "anshin-b910b",
    storageBucket: "anshin-b910b.appspot.com",
    messagingSenderId: "90615451197",
    appId: "1:90615451197:web:8dda131f98d7cf0298a454",
    measurementId: "G-ZE64VJV918"
  };

  firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage();

export { storage, firebase as default };