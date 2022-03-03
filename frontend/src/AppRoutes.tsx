import React from "react";

import {useSelector} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";

import {RootState} from "./app/reducer"
import {AppRole} from "./models/AppRole";
import LandingPage from "./pages/landing/LandingPage";
import AdminHomePage from "./pages/admin/home/AdminHomePage";
import GuestHomePage from "./pages/guest/home/GuestHomePage";
import GuestApartmentsDetails from "./pages/guest/apartments/details/GuestApartmentsDetails";
import GuestReservations from "./pages/guest/reservations/GuestReservations";

export default function AppRoutes() {
    const { currentUser, status} = useSelector((state: RootState) => state.app);

    const notLoggedIn = () => {
        return status !== "waiting" && status !== "idle" && status === "error";
    };

    const loggedIn = () => {
        return status === "success" && currentUser;
    };

    function isGuest() {
        return currentUser.role === AppRole.GUEST;
    }

    function isAdmin() {
        return currentUser.role === AppRole.ADMIN;
    }

    return (
        <Switch>
            {notLoggedIn() && <Route path="/" exact component={LandingPage} />}
            {notLoggedIn() && <Redirect to="/"/>}
            {loggedIn() && isAdmin() && <Route path="/admin/:content" exact component={AdminHomePage} />}
            {loggedIn() && isAdmin() && <Redirect from="*" to="/admin/home"/>}
            {loggedIn() && isGuest() && <Route path="/guest/:content/:id?" exact component={GuestHomePage} />}
            {loggedIn() && isGuest() && <Redirect from="*" to="/guest/home"/>}
        </Switch>
    )


}