import userTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    signInError: false,
    signUpError: false,
};

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case userTypes.SIGN_IN_ERROR:
            return{
                ...state,
                signInError: action.payload
            }
        case userTypes.SIGN_UP_ERROR:
            return{
                ...state,
                signUpError: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;