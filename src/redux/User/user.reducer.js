import userTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    singInError: false
};

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case userTypes.SING_IN_ERROR:
            return{
                ...state,
                singInError: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;