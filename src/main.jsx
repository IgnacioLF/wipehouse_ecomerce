import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import {store, persistor } from "./redux/createStore";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
