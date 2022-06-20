import userTypes from "./user.types";
import { takeLatest, call, all, put } from 'redux-saga/effects'
import { signInSuccess, signOutUserSuccess, signInError, signUpError } from "./user.actions";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth' 
import { auth,handleUserProfile ,getCurrentUser} from '../../firebase/utils';
import { getDoc } from "firebase/firestore";

 export function* getSnapshotFromUserAuth(user) {
    try{
        const userRef = yield call(handleUserProfile, user)
        const snapshot = yield getDoc(userRef)
        yield put(signInSuccess({
            id: snapshot.id,
            ...snapshot.data()
        }))
    }catch (err) {
        /* console.log(err); */
    }
}
 
export function* emailSignIn({ payload: email, password}){
    try {
        const { user } = yield signInWithEmailAndPassword (auth, email, password)
        yield getSnapshotFromUserAuth(user);

    } catch (err){
        const errorCode = err.code
        let errormessage = 'Ha ocurrido un error al realizar la operación'
        switch (errorCode) {
            case 'auth/wrong-password':
                errormessage = 'El email o la contraseña no coinciden'
                break;
            case 'auth/user-not-found':
                errormessage = 'El email introducido no esta registrado'
                break;
        }
        yield put(signInError(errormessage))
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch (err) {
        /*  console.log(err); */
    }

}

export function* signOutUser() {
    try{
        yield auth.signOut();
        yield put (
            signOutUserSuccess()
        )
    } catch (err) {
        /* console.log(err) */
    }
}

export function* googleSignIn() {
    try {
        const provider = new GoogleAuthProvider();
        const { user } = yield signInWithPopup(auth, provider)
        yield getSnapshotFromUserAuth(user);
    } catch (err) {
        /* console.log(err) */
    }
}


export function* signUpUser ({ payload: nombre, email, password }) {
    try {
        const { user } = yield createUserWithEmailAndPassword(auth, email, password)
        user.displayName = nombre
        yield getSnapshotFromUserAuth(user)
    } catch (err) {
        const errorCode = err.code
        let errormessage = 'Ha ocurrido un error al realizar la operación'
        switch (errorCode) {
            case 'auth/email-already-in-use':
                errormessage = 'El email ya esta registrado'
                break;
        }
        yield put (signUpError(errormessage))
    }
    
}

export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_START, signUpUser)
}

export function* onGooogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export default function* userSagas(){
    yield all([
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutUserStart),
        call(onGooogleSignInStart),
        call(onSignUpUserStart),    
    ])
}