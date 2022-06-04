import userTypes from './user.types';

export const emailSignInStart = (email,password) => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: email,password,
});

export const signInSuccess = user => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user,
})
 
export const checkUserSesion = () => ({
    type: userTypes.CHECK_USER_SESSION,
})

export const signOutUserStart = () => ({
    type: userTypes.SIGN_OUT_USER_START
})

export const signOutUserSuccess = () => ({
    type: userTypes.SIGN_OUT_USER_SUCCESS
})

export const signInError = message => ({
    type: userTypes.SIGN_IN_ERROR,
    payload: message,
})

export const googleSignInStart = () => ({
    type: userTypes.GOOGLE_SIGN_IN_START
})

export const signUpUserStart = (nombre,email,password) => ({
    type: userTypes.SIGN_UP_START,
    payload: nombre,email,password,
})

export const signUpError = message => ({
    type: userTypes.SIGN_UP_ERROR,
    payload: message,
})