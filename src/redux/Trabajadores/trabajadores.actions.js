import trabajadoresTypes from "./trabajadores.types";

export const addTrabajadorStart = (categoria,nombre,imageURL,precio) => ({
    type: trabajadoresTypes.ADD_NEW_TRABAJADOR_START,
    payload: categoria,nombre,imageURL,precio,
})

export const fetchTrabajadoresStart = () => ({
    type: trabajadoresTypes.FETCH_TRABAJADORES_START
});

export const setTrabajadores = trabajadores => ({
    type: trabajadoresTypes.SET_TRABAJADORES,
    payload: trabajadores,
})

export const deleteTrabjadorStart = trabajadorID => ({
    type: trabajadoresTypes.DELETE_TRABAJADOR_START,
    payload: trabajadorID,
})