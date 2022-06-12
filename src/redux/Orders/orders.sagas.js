import ordersTypes from "./orders.types";
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { handleSaveOrder } from "./orders.helpers";
import { auth } from "../../firebase/utils";
import { clearCart } from "../Cart/cart.actions";
import { getFormatedDate } from "../../Utils";

export function* saveOrder({ payload }) {
    try{
        const timestamps =  getFormatedDate(new Date())
        yield handleSaveOrder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamps
        })
        yield put(
            clearCart()
        )

    } catch (err) {
        console.log(err)
    }
}

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HYSTORY_START, saveOrder)
}

export function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
    ])
}