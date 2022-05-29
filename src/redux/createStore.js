import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import routeReducer from "./routeReducer";

export const middleware = [logger];

export const store = createStore(routeReducer, applyMiddleware(...middleware))

export default store;