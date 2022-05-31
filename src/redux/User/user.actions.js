import { async } from '@firebase/util';
import userTypes from './user.types';
import { auth } from '../../firebase/utils';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth' 


export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})

export const signInUser = ( email, password ) => async dispatch => {
     signInWithEmailAndPassword (auth, email, password)
        .catch((err) => {
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
            dispatch({
                type: userTypes.SIGN_IN_ERROR,
                payload: errormessage
            })
        })
}

export const signUpUser = ( nombre, email, password) => async dispatch => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            auth.currentUser.displayName = nombre
        })
        .catch((err) => {
            const errorCode = err.code
            let errormessage = 'Ha ocurrido un error al realizar la operación'
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    errormessage = 'El email ya esta registrado'
                    break;
            }
            dispatch({
                type: userTypes.SIGN_UP_ERROR,
                payload: errormessage
            })
        })
}