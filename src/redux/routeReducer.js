import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import trabajadoresReducer from "./Trabajadores/trabajadores.reducer";
import cartReducer from "./Cart/cart.reducer";

export default combineReducers({
    user: userReducer,
    trabajadoresData: trabajadoresReducer,
    cartData: cartReducer,
});