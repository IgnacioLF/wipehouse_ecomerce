import ordersTypes from "./orders.types";
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { handleGetOrder, handleSaveOrder, hangleGetUserOrderHistory } from "./orders.helpers";
import { auth } from "../../firebase/utils";
import { clearCart } from "../Cart/cart.actions";
import { setOrderDeetails, setUserOrderHistory } from "./orders.actions";

export function* saveOrder({ payload }) {
    try{
        const timestamp = new Date();
        yield handleSaveOrder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamp
        })
        yield put(
            clearCart()
        )
    } catch (err) {
        console.log(err)
    }
}

export function* getUserOrderHistory ({ payload }){
    try{
        const history = yield hangleGetUserOrderHistory(payload)
        yield put(setUserOrderHistory(history))
    } catch (err){
        console.log(err)
    }

}

export function* getOrderDetails ({payload}) {
    try {
        const order = yield handleGetOrder(payload)
        yield put(setOrderDeetails(order))
    } catch (err) {
        console.log(err)
    }
}

export function* onGetOrderDetailsStart () {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails)
}

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory)
}

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HYSTORY_START, saveOrder)
}

export function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart)
    ])
}