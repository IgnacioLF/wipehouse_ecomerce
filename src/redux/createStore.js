import { legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import routeReducer from "./routeReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const middlewares = [thunk, sagaMiddleware, logger];

export const store = createStore(routeReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga);

export default store;