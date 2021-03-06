import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";

import "./index.css";

import App from "./App";
import store from "./app/store";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-slideshow-image/dist/styles.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();