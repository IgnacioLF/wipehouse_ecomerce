import { all, call } from 'redux-saga/effects';
import { ordersSagas } from './Orders/orders.sagas';
import trabajadoresSagas from './Trabajadores/trabajadores.sagas';
import userSagas from './User/user.sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(trabajadoresSagas),
        call(ordersSagas)
    ])
}