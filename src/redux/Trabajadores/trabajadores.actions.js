import trabajadoresTypes from "./trabajadores.types";

export const addTrabajadorStart = trabajadorData => ({
    type: trabajadoresTypes.ADD_NEW_TRABAJADOR_START,
    payload: trabajadorData
})