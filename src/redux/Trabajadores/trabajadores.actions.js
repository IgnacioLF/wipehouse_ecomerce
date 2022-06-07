import trabajadoresTypes from "./trabajadores.types";

export const addTrabajadorStart = (categoria,nombre,imageURL,precio,descripcion) => ({
    type: trabajadoresTypes.ADD_NEW_TRABAJADOR_START,
    payload: categoria,nombre,imageURL,precio,descripcion,
})

export const fetchTrabajadoresStart = (filters={}) => ({
    type: trabajadoresTypes.FETCH_TRABAJADORES_START,
    payload: filters,
});

export const setTrabajadores = trabajadores => ({
    type: trabajadoresTypes.SET_TRABAJADORES,
    payload: trabajadores,
})

export const deleteTrabjadorStart = trabajadorID => ({
    type: trabajadoresTypes.DELETE_TRABAJADOR_START,
    payload: trabajadorID,
})

export const fetchTrabajadorStart = trabajadorID => ({
    type: trabajadoresTypes.FETCH_TRABAJADOR_START,
    payload: trabajadorID
})

export const setTrabajador = trabajador => ({
    type: trabajadoresTypes.SET_TRABAJADOR,
    payload: trabajador
})