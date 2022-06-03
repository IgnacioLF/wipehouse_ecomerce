import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "./config";
import firebase from 'firebase/compat/app';
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth , GoogleAuthProvider , signInWithPopup ,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util';



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const firestore = firebase.firestore;

/*
NOT USED
const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
}; */

/**
    create user document if not exist
*/
export const handleUserProfile = async( userAuth, additionalData ) => {
    if (userAuth!=null) {
        const {uid} = userAuth;
        const userRef = doc(db,'users',`${uid}`)
        const snapshot = await getDoc(userRef)
        if(!snapshot.exists()) {
            const { displayName, email } = userAuth;
            const timestamp = new Date();
            const userRoles = [ 'user' ];
            try{
                await setDoc(userRef,{
                    displayName,
                    email,
                    createdDate: timestamp,
                    userRoles,
                    ...additionalData
                })
            }catch(error){
             console.log(error)
            }
        }
        return userRef;
    }
}

/**
 * create user from signup from
 */
export const createUserfromregister = async(nombre, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            auth.currentUser.displayName = nombre
        })
        .catch((error) => {
            console.log(error)
        })
}

/**
 * login with email and password
 */
export const signinWithEmail = async(email,password) =>{
    signInWithEmailAndPassword (auth, email, password)
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password'){
                console.log('abc')
                error = 'Email o contraseña invalidos'
            }
            console.log(errorCode);
            error = ('error general');
        })
}


export const getCurrentUser = () => {
    return new Promise ((resolve,reject) => {
        const unsuscribe = auth.onAuthStateChanged(userAuth => {
            unsuscribe();
            resolve(userAuth)
        },reject);
    })
}


