import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "./config";
import { getAuth , GoogleAuthProvider , signInWithPopup} from 'firebase/auth'



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const singInWithGoogle = () => {
    signInWithPopup(auth, provider)
};

/*
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export const defaultauth = getAuth;
export const firestore = firebase.firestore;
const GoogleProvider = new firebase.defaultauth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});
 export const singInWithGoogle = () => defaultauth.singInWithPopop();
 
 */