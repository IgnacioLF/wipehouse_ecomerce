import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./User/user.reducer";
import trabajadoresReducer from "./Trabajadores/trabajadores.reducer";
import cartReducer from "./Cart/cart.reducer";
import ordersReducer from "./Orders/orders.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    trabajadoresData: trabajadoresReducer,
    cartData: cartReducer,
    orderData: ordersReducer
});

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData','user']
}

export default persistReducer(configStorage, rootReducer)