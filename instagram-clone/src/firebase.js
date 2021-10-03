import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBH7eFcNHHrvJBpimIn1FWkt-rmsmsrN-M",
    authDomain: "instagram-clone-react-c7be9.firebaseapp.com",
    projectId: "instagram-clone-react-c7be9",
    storageBucket: "instagram-clone-react-c7be9.appspot.com",
    messagingSenderId: "468216305460",
    appId: "1:468216305460:web:9f1db81d3290420d9bf761",
    measurementId: "G-4E6PG9P2TL"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };