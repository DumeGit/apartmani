import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {RootState} from "../../../app/reducer";
import {HeaderAction} from "../../../components/layout/HeaderModel";
import * as api from "../../../api/auth"
import {actions} from "../../../App.slice";
import Header from "../../../components/layout/Header";
import {HomeIcon, LockClosedIcon, UserIcon} from "@heroicons/react/solid";

export default function GuestHeader() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {currentUser} = useSelector((state: RootState) => state.app);

    const headerActions: HeaderAction[] = [
        {
            key: "GuestHome",
            title : currentUser.email,
            onClick: () => history.push("/guest/home"),
            colorClass : "bg-primary",
            variant: "primary",
            icon: <HomeIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
        },
        {
            key: "GuestHome",
            title : "My reservations",
            onClick: () => history.push("/guest/reservations"),
            colorClass : "bg-primary",
            variant: "primary",
            icon: <HomeIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
        },
        {
            key: "GuestLogout",
            title: "Logout",
            onClick: () =>
                api
                    .logout()
                    .then((response) => {
                        if(response.ok) {
                            dispatch(actions.getCurrentUser());
                            history.push("/")
                        } else {
                            console.warn("Logout failed");
                        }
                    })
                    .catch((reason) => console.warn("Logout failed" + reason)),
            colorClass: "bg-secondary",
            variant: "secondary",
            icon: <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
        },

    ];

    return <Header actions={headerActions} buttonTitle="Guest login"/>;
}