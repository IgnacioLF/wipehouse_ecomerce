import { takeLatest, put, all, call} from 'redux-saga/effects'
import trabajadoresTypes from './trabajadores.types'
import { handleAddTrabajador, handleDeleteTrabajador, handleFetchTrabjadores } from './trabajadores.helpers'
import { auth } from '../../firebase/utils'
import { setTrabajadores, fetchTrabajadoresStart } from './trabajadores.actions';


export function* addTrabajador ({payload: categoria,nombre,imageURL,precio}){
    try {
        const timestamp = new Date();
        yield handleAddTrabajador({
            categoria,
            nombre,
            imageURL,
            precio,
            trabajadorAdminUID: auth.currentUser.uid,
            createdDate: timestamp
        })
        yield put(fetchTrabajadoresStart())

    } catch (err) {
        console.log(err)  
    }
}

export function* fetchTrabjadores () {
    try {
        const trabajadores = yield handleFetchTrabjadores();
        yield put(
            setTrabajadores(trabajadores)
        );
    } catch (err){
        console.log(err)
    }
}

export function* deleteTrabjador({payload}){
    console.log('id',payload)
    try {
        yield handleDeleteTrabajador(payload);
        yield put(fetchTrabajadoresStart())
    } catch (err) {
        console.log(err)
    }
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
        call(onDeleteTrabajadorStart)
    ])
}