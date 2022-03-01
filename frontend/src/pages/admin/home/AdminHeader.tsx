import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {RootState} from "../../../app/reducer";
import {HeaderAction} from "../../../components/layout/HeaderModel";
import * as api from "../../../api/auth"
import {actions} from "../../../App.slice";
import Header from "../../../components/layout/Header";

export default function AdminHeader() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {currentUser} = useSelector((state: RootState) => state.app);

    const headerActions: HeaderAction[] = [
        {
            key: "AdminHome",
            title : currentUser.email,
            onClick: () => history.push("/admin/home"),
            colorClass : "bg-primary",
            variant: "primary"
        },
        {
            key: "AdminLogout",
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
            variant: "secondary"
        },

    ];

    return <Header actions={headerActions} buttonTitle="Admin login"/>;
}