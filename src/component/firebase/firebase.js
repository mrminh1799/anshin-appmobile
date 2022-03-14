import firebase from "firebase/app"
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuRcVdQVjAxXNwI8x-yK0aSn9MPphcizc",
    authDomain: "mlem-cd6a2.firebaseapp.com",
    projectId: "mlem-cd6a2",
    storageBucket: "mlem-cd6a2.appspot.com",
    messagingSenderId: "970063060281",
    appId: "1:970063060281:web:3644b96310dfcf7fd11ce8",
    measurementId: "G-LNLXEDVKY5"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };