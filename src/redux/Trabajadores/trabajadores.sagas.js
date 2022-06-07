import { takeLatest, put, all, call} from 'redux-saga/effects'
import trabajadoresTypes from './trabajadores.types'
import { handleAddTrabajador, handleDeleteTrabajador, handleFetchTrabajador, handleFetchTrabjadores } from './trabajadores.helpers'
import { auth } from '../../firebase/utils'
import { setTrabajadores, fetchTrabajadoresStart, setTrabajador } from './trabajadores.actions';


export function* addTrabajador ({payload: categoria,nombre,imageURL,precio,descripcion}){
    try {
        const timestamp = new Date();
        yield handleAddTrabajador({
            categoria,
            nombre,
            imageURL,
            precio,
            descripcion,
            trabajadorAdminUID: auth.currentUser.uid,
            createdDate: timestamp
        })
        yield put(fetchTrabajadoresStart())

    } catch (err) {
        console.log(err)  
    }
}

export function* fetchTrabjadores ({payload}) {
    try {
        const trabajadores = yield handleFetchTrabjadores({ payload });
        yield put(
            setTrabajadores(trabajadores)
        );
    } catch (err){
        console.log(err)
    }
}

export function* deleteTrabjador({payload}){
    try {
        yield handleDeleteTrabajador(payload);
        yield put(fetchTrabajadoresStart())
    } catch (err) {
        console.log(err)
    }
}

export function* fetchTrabajador ({ payload }) {
    try {
        const trabajador = yield handleFetchTrabajador(payload)
        console.log('trabajador',trabajador)
        yield put(setTrabajador(trabajador))

    } catch (err) {
        console.log(err)
    }
}

export function* onFetchTrabajadorStart () {
    yield takeLatest(trabajadoresTypes.FETCH_TRABAJADOR_START, fetchTrabajador)
}

export function* onDeleteTrabajadorStart () {
    yield takeLatest(trabajadoresTypes.DELETE_TRABAJADOR_START, deleteTrabjador)
}

export function* onFetchTrabajadoresStart () {
    yield takeLatest(trabajadoresTypes.FETCH_TRABAJADORES_START, fetchTrabjadores)
}

export function* onAddTrabajadores () {
    yield takeLatest(trabajadoresTypes.ADD_NEW_TRABAJADOR_START, addTrabajador)
}

export default function* trabajadoresSagas() {
    yield all([
        call(onAddTrabajadores),
        call(onFetchTrabajadoresStart),
        call(onDeleteTrabajadorStart),
        call(onFetchTrabajadorStart)
    ])
}