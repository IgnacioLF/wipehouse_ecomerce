import { legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import routeReducer from "./routeReducer";

export const middleware = [thunk, logger];

export const store = createStore(routeReducer, applyMiddleware(...middleware))

export default store;