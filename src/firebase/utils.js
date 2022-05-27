import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "./config";
import firebase from 'firebase/compat/app';
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth , GoogleAuthProvider , signInWithPopup} from 'firebase/auth'



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const firestore = firebase.firestore;

const provider = new GoogleAuthProvider();

export const singInWithGoogle = () => {
    signInWithPopup(auth, provider)
};

/*
    create user document
*/
export const handleUserProfile = async(userAuth, additionalData) => {
    if (userAuth!=null) {
        const {uid} = userAuth;
        const userRef = doc(db,'users',`${uid}`)
        const snapshot = await getDoc(userRef)
        if(!snapshot.exists()) {
            const { displayName, email } = userAuth;
            const timestamp = new Date();
            try{
                await setDoc(userRef,{
                    displayName,
                    email,
                    createdDate: timestamp,
                    ...additionalData
                })
            }catch(error){
             console.log(error)
            }
        }
        return userRef;
    }
}


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