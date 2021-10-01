import { initializeApp } from 'firebase/app';

// import firebase from 'firebase'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDaJ2QcFUxdd4IIMtR_JFDQ5kc_VRrqkS0",
    authDomain: "drive-clone-10174.firebaseapp.com",
    projectId: "drive-clone-10174",
    storageBucket: "drive-clone-10174.appspot.com",
    messagingSenderId: "908104549093",
    appId: "1:908104549093:web:00bb0e162879f66bcc4a0c",
    measurementId: "G-2N0SN54LHC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const storage = firebase.storage()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, storage, auth, provider }