import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCUp3cRoGy8OKH9BrMJ1tP8HfhctfXxPZw",
  authDomain: "whatsapp-clone-508eb.firebaseapp.com",
  projectId: "whatsapp-clone-508eb",
  storageBucket: "whatsapp-clone-508eb.appspot.com",
  messagingSenderId: "892807447403",
  appId: "1:892807447403:web:9879793aa2ddc9f088022e",
  measurementId: "G-MPWCRBL2X3"
};
let firebaseApp =firebase.initializeApp(firebaseConfig)
let db = firebaseApp.firestore()
let auth =firebase.auth();
let provider = new firebase.auth.GoogleAuthProvider();
export {auth ,provider}
export  default db



