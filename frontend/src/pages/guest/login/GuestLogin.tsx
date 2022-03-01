import React from "react";
import {LoginForm} from "../../../components/LoginForm";
import * as api from "../../../api/auth"

export default function GuestLogin() {
    return(
        <LoginForm apiCall={api.guestLogin} historyPush="/guest/home"  register={true}/>
    )
}