import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBaGPdDkkRgkxkZtvqUAFqMSlH6RP8oOjE",
  authDomain: "facebookclone-fd735.firebaseapp.com",
  databaseURL: "https://facebookclone-fd735.firebaseio.com",
  projectId: "facebookclone-fd735",
  storageBucket: "facebookclone-fd735.appspot.com",
  messagingSenderId: "1084743183957",
  appId: "1:1084743183957:web:fafe0fb3623388cd6d6edc",
  measurementId: "G-LQW4RN6408"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider,storage };
export default db;