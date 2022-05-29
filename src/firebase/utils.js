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

const provider = new GoogleAuthProvider();

export const singInWithGoogle = () => {
    signInWithPopup(auth, provider)
};

/**
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

/**
 * create user from singup from
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
export const singinWithEmail = async(email,password) =>{
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
/*
    let p = new Promise((resolve,reject) => {
        signInWithEmailAndPassword (auth, email, password).then()
        .catch((error) => {
            console.log(error);
            const errorCode = error.code
            reject(errorCode)
        })
    })

    p.then((mensaje) => {
        console.log('then:', mensaje)
        return(mensaje)
    }).catch((mensaje) => {
        console.log('cathc:', mensaje)
        return(mensaje)
    })

    */
}

