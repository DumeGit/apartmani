import React, {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";

import {useDispatch} from "react-redux";


import {actions} from "./App.slice";
import AppRoutes from "./AppRoutes";
import {AlertProvider} from "./util/AlertContext";
import LandingPage from "./pages/landing/LandingPage";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getCurrentUser());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <AlertProvider>
                <div className="page-wrapper">
                    <AppRoutes/>
                </div>
            </AlertProvider>
        </BrowserRouter>
    );
}