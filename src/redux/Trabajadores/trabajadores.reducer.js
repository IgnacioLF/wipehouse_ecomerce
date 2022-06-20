import trabajadoresTypes from "./trabajadores.types";

const INITIAL_STATE = {
    trabajadores: [],
    trabajador: {}
};

const trabajadoresReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case trabajadoresTypes.SET_TRABAJADORES:
            return{
                ...state,
                trabajadores: action.payload
            }
        case trabajadoresTypes.SET_TRABAJADOR:
            return{
                ...state,
                trabajador: action.payload
            }
        default:
            return state;
    }
};

export default trabajadoresReducer;