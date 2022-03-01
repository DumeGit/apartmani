import React from "react";
import {LoginForm} from "../../../components/LoginForm";
import * as api from "../../../api/auth"

export default function AdminLogin() {
    return(
        <LoginForm apiCall={api.adminLogin} historyPush="/admin/home"  register={false}/>
    )
}